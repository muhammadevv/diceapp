import zod from "zod";

// Define the schema for CreateJettonRequest
export const CreateJettonRequest = zod.object({
  name: zod.string(),
  description: zod.string(),
  image_data: zod.string(),
  symbol: zod.string(),
  decimals: zod.number(),
  amount: zod.string(),
});

// Note: JavaScript does not use types, so you can remove the type definition
