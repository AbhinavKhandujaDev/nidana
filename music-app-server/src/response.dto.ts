import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({
    description: 'Status of the response',
    example: false,
  })
  error: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Request was successful',
  })
  message: string;

  @ApiProperty({
    description: 'Data returned by the endpoint',
    example: {},
  })
  data: T;

  constructor(error: boolean, message: string, data?: T) {
    this.error = error;
    this.message = message;
    this.data = data;
  }

  setError(error: boolean) {
    this.error = error;
    return this;
  }
  setMessage(message: string) {
    this.message = message;
    return this;
  }
  setData(data?: T) {
    this.data = data;
    return this;
  }

  getResponse() {
    return {
      error: this.error,
      message: this.message,
      data: this.data,
    };
  }
}
