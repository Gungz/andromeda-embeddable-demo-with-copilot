import { NextApiRequest, NextApiResponse } from 'next';
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSPagesRouterEndpoint,
} from '@copilotkit/runtime';

import { GoogleGenerativeAI } from '@google/generative-ai'; 
    
const genAI = new GoogleGenerativeAI(process.env["NEXT_GOOGLE_API_KEY"]!);
const copilotKit = new CopilotRuntime();
const serviceAdapter = new GoogleGenerativeAIAdapter({ model: genAI.getGenerativeModel({ model: "gemini-1.5-pro" }) });
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const runtime = new CopilotRuntime();
 
  const handleRequest = copilotRuntimeNextJSPagesRouterEndpoint({
    endpoint: '/api/copilotkit',
    runtime,
    serviceAdapter,
  });
 
  return await handleRequest(req, res);
};
 
export { handler as GET, handler as POST };