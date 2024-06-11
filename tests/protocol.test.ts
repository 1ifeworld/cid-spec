import { describe, it, expect } from 'vitest';
import { ChannelCreateBody } from '../src/types';

describe('Message', () => {
  it('should have a valid type', () => {
    const messageBody: ChannelCreateBody = {
      uri: "fakeIpfsString"
    };

    // Directly check the properties
    expect(Object.keys(messageBody).length).toBe(1);    
    expect(messageBody).toHaveProperty('uri');
    expect(typeof messageBody.uri).toBe('string');
  });
});