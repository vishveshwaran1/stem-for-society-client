import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // ✅ API endpoint
  .setProject("68bea27a000d7acc78fe");         // your project ID

const account = new Account(client);

export { account, client };
