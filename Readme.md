# This is the development branch for Yicheng Xiao

This is the branch for formbuilder project. If you want to run it on your machine locally, you can follow the steps below:

```
npm install
npm run dev
```

You should be aware that the project is using a local server, and the server is running on port 3000. The original project is by [Klinton](https://github.com/Kliton/yt_pageform/) and I remove the user authentication part by clerk and rewrite the `action/form.tsx` file to avoid using prisma (which is used to control the database).

After you refresh the page, the data stored in the `form.tsx` will be removed and you need to fill the form again.