# luisa-agent

The Luisa-Agent is a "text to UI design" AI agent that can turn natural language descriptions into app designs, and in the future running code. The main focus of this project is to explore how to build such a system. 

![Luisa Agent](imgs/LuisaAgent.png)

The core idea is based on the observation that LLMs are very good in producing code and text, but have a rather limited capability to do maths and spatial layouts. The Luisa-Agent avoids these limitations, by relying on a domain specific language (DSL) of UI elements. This language specifies the elements of a design and the structure in terms of parent child relations, however the graphical layouting is delegated to the YOGA lib, similar to how a browser interprets HTML.

This DSL is inspired by HTML, but goes beyond simple primitive building blocks and also allows complex elements, such as navbars, or hero sections. This has the advantage of reducing token consumption, and injecting more domain knowledge implicitly into the LLM.

## Current State

The Luisa-Agent comes with a basic chat and preview UI, that allows to improve the agent's implementation. Current OpenAi, Claude and Gemini models are supported.




# Project Setup

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm run dev
```

## Compile and Minify for Production

```sh
npm run build
```

## Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

# Where to get API Keys

You need API keys to run the agent. These are stored in local storage, so be careful to limit
the budget per key if possible.

https://aistudio.google.com/projects

https://console.anthropic.com/settings/billing