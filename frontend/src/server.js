
// export const server = "https://eshop-tutorial.vercel.app/api/v2";

// export const server = "https://stone-crusher-erp-base-api.vercel.app/api/v2";

// export const server = "http://localhost:8000/api/v2";

export const server =
    process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT'
        ? 'http://localhost:8000/api/v2'
        : 'https://stone-crusher-erp-base-api.vercel.app/api/v2';


// export const backend_url = "https://role-based-eshop-framework.vercel.app/";
// export const backend_url = "http://localhost:8000/";
// export const backend_url = "https://stone-crusher-erp-base-api.vercel.app";
//edits

