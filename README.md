# Use nx

## Create new library or application

Before using any of the plugins, it needs to be installed.

```powershell
npx nx add @nx/react
# or
npx nx add @nx/node
```

Then you can run:

```powershell
# react library
npx nx g @nx/react:lib libs/<project_name>

# node library
npx nx g @nx/node:lib libs/<project_name>

# node application
npx nx g @nx/node:application apps/<project_name>

```

## Add shadcn/ui components

```powershell
cd .\libs\ui
npx shadcn@latest add <component_name>
```

# Manage database
from the `libs/rui-database` folder
```powershell
# update 
npx prisma generate
```