export default `
<Screen>
    <Nav flex-direction="row">
        <NavLink label="Home" variant="Active"></NavLink>
        <NavLink label="Features" variant="Default"></NavLink>
        <NavLink label="Pricing" variant="Default"></NavLink>
        <NavLink label="About" variant="Default"></NavLink>
        <NavLink label="Sign Up" variant="CallToAction"></NavLink>
        <NavLink label="Log In" variant="Default"></NavLink>
    </Nav>
    <CheckBoxGroup options="A,B,C"></CheckBoxGroup>
    <Hero headline="Supercharge Your Workflow" call_to_action="Start your free trial and boost productivity today!" variant="Default"></Hero>
    <Section flex-direction="row">
        <Card flex-direction="column">
            <Image value="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=200&q=80"></Image>
            <SubHeadline label="Task Management"></SubHeadline>
            <Label label="Easily organize and track your daily tasks." variant="Emphasis"></Label>
            <Button label="Learn more" variant="Secondary"></Button>
        </Card>
        <Card flex-direction="column">
            <Image value="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"></Image>
            <SubHeadline label="Team Collaboration"></SubHeadline>
            <Label label="Share ideas and stay in sync with your team." variant="Emphasis"></Label>
            <Button label="Explore" variant="Secondary"></Button>
        </Card>
        <Card flex-direction="column">
            <Image value="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80"></Image>
            <SubHeadline label="Analytics"></SubHeadline>
            <Label label="Get real-time insights into your progress." variant="Emphasis"></Label>
            <Button label="View Details" variant="Secondary"></Button>
        </Card>
        <Card flex-direction="column">
            <Image value="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=200&q=80"></Image>
            <SubHeadline label="Automation"></SubHeadline>
            <Label label="Automate repetitive tasks and save time." variant="Emphasis"></Label>
            <Button label="Automate" variant="Secondary"></Button>
        </Card>
    </Section>
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
                <Container flex-direction="column">
                    <Label label="Password"></Label>
                    <Password label="Create a password"></Password>
                </Container>
                <Container flex-direction="column">
                    <Label label="Organisation (optional)"></Label>
                    <Input label="Your company"></Input>
                </Container>
                <Container flex-direction="column">
                    <Label label="Role"></Label>
                    <RadioGroup options="Manager, Developer, Designer, Other"></RadioGroup>
                </Container>
            </Container>
            <Container flex-direction="row">
                <CheckBox label="I agree to the Terms and Privacy Policy"></CheckBox>
                <Button label="Sign Up Free" variant="Primary"></Button>
            </Container>
        </Container>
    </Section>
</Screen>`