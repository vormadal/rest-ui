# Copilot Instructions

## Project Overview
This project is a UI builder built with NextJS.
It is intended to be used with OpenAPI specs, which helps define form fields and actionable buttons. We assume all response and request bodies are using application/json.
The output is a JSON formatted file, which contains information such as:
    - which component to render
    - mapping of response body fields to text, table or other custom components
    - mapping of request body fields to form fields
Available components are defined in the `rui-react-config` project:
    - each component configuration has a name, the component itself and a list of options, which can be used in admin application to allow additional configuration of the component 



## Coding Standards
- Follow consistent naming conventions
- Use TypeScript for type safety
- Prefer functional programming patterns
- Write self-documenting code with meaningful variable names

## Architecture Guidelines
- Follow the established folder structure
- Separate concerns (models, services, components)
- Use dependency injection where appropriate
- Implement proper error handling
- React components should be small and simple

## Documentation
- Add JSDoc comments for public APIs
- Update README.md when adding new features
- Document complex algorithms and business logic

## Dependencies
- Prefer established, well-maintained packages
- Avoid unnecessary dependencies
- Keep dependencies up to date
- NX for building the project
- Tailwind for CSS
- ShadCN for default components stored in libs/ui
- to install new ShadCN components run the `npx shadcn@latest add <component_name>` from the `libs\ui` folder

## Security Considerations
- Validate all user inputs
- Use environment variables for sensitive data
- Follow OWASP security guidelines