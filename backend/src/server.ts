import express from "express";

export default class Server {
  public app = express();
  private readonly port: string;

  constructor(port: string) {
    this.port = port;
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port : ${this.port}`);
    });
  }
}
