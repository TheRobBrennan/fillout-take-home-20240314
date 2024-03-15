declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FILLOUT_API_KEY: string
      FILLOUT_FORM_ID: string
      PORT: number
    }
  }
}

export { };
