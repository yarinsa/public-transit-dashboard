// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "public-transit-dashboard",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const domain = $app.stage === "production" ? "dashboard.yarinsa.me" : undefined;
    const app = new sst.aws.Nextjs("TransitDashboard", {
      domain,
      environment: {
        NEXT_PUBLIC_API_URL: domain ? new URL(`https://${domain}`).toString() : ``,
      },
    })
    
    console.log(app.url);
  },
});
