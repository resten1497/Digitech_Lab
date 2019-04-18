const TextMessage =  (Message) => {
  const responseBody = {
    version: '2.0',
    template: {
      outputs: [
        {
          simpleText: {
            text: Message
          }
        }
      ]
    }
  }
  return responseBody
}

export { TextMessage  }
