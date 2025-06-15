export default `
<Screen>
    <Nav flex-direction="row" name="Nav1">
        <NavLink label="Home" variant="Active" name="Nav1Link1"></NavLink>
        <NavLink label="Features" variant="Default"></NavLink>
        <NavLink label="Pricing" variant="Default"></NavLink>
    </Nav>
 <CheckBoxGroup options="A,B,C"></CheckBoxGroup>
    <Section flex-direction="row">
        <Container flex-direction="column">
            <Headline label="Get Started Now"></Headline>
            <Label label="Sign up to experience all features free for 14 days. No credit card required!" variant="Emphasis"></Label>
            <Container flex-direction="row">
                <Container flex-direction="column">
                    <Label label="Full Name"></Label>
                    <Input label="Enter your name"></Input>
                </Container>
                <Container flex-direction="column">
                    <Label label="Email Address"></Label>
                    <Input label="Enter your email"></Input>
                </Container>               
            </Container>
            <Container flex-direction="row">
                <CheckBox label="I agree to the Terms and Privacy Policy"></CheckBox>
                <Button label="Sign Up Free" variant="Primary"></Button>
            </Container>
        </Container>
    </Section>
</Screen>`