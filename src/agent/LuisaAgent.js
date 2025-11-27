
import Pipeline from "./Pipeline";
import DLS from "./DLS";
import Elements from "./Elements";

import ScreenTool from "./tools/ScreenTool";
import StructureTool from "./tools/StructureTool";
import DLSTool from "./tools/DLSTool";

export default class LuisaAgent {
  constructor(llm, config = {}) {
    this.llm = llm;
    this.config = config;
    this.screenSize = config.screenSize ? config.screenSize : { w: 400, h: 800 };
    this.dsl = config.dls ? config.dls : new DLS();
    this.elements = config.elements ? config.elements : new Elements();
    this.useCustomDSL = config.useCustomDSL ? config.useCustomDSL : false;

    this.structureTool = config.structureTool ? config.structureTool : new StructureTool(this.llm,  config);
    this.screenTool = config.screenTool ? config.screenTool : new ScreenTool(this.llm, this.elements , config);
    this.dslTool = config.dslTool ? config.dslTool : new DLSTool(this.llm, this.dsl, config);

    
    this.pipeline = config.pipeline ? config.pipeline : Pipeline.defaultPipeline(this.dsl, this.useCustomDSL);

    console.debug("LuisaAgent() > ", this.useCustomDSL);
  }

  setProgressCallback(c) {
    this.progressCallback = c;
  }

  async run(messages, currentModel) {
    const result = {
      name: "",
      screenSize: this.screenSize,
      dsl: {},
      screens: [],
      raw: {
        screens: [],
        dsl: {},
        screenSize: this.screenSize,
      },
    };


    // 1) think about a good structure
    this.onProgress(" - Plan main structure...");
    const structure = await this.structureTool.run(messages, currentModel);
    if (structure.error) {
      return structure;
    }

    console.debug("run() > structure ", structure);

    result.raw.structure = structure.app;
    const app = structure.app;
    result.name = app.name;

    // 2) create the screens
    for (let section of app.sections) {
      for (let s of section.screens) {
        this.onProgress("- Create screen __" + s.name + "__");
        const scrn = await this.screenTool.run(messages, s, section, app, currentModel);
        if (scrn.raw) {
          scrn.raw.name = s.name;
          result.screens.push(structuredClone(scrn.raw));
          result.raw.screens.push(scrn.raw);
        } else {
          console.warn("run() > Could not create screen");
        }
      }
    }

    //3) plan design system
    this.onProgress(" - Plan design system...");
    const dsl = await this.dslTool.run(messages, currentModel);
    result.dsl = dsl;
    result.raw.dsl = dsl;

    // 4) Set basic props and design system
    this.pipeline.convert(result);

    return result;
  }


  onProgress(message) {
    if (this.progressCallback) this.progressCallback(message);
  }

  getUserMessages(messages) {
    return messages
      .filter((m) => m.role == "user")
      .map((m) => m.content)
      .join("\n\n");
  }
}
