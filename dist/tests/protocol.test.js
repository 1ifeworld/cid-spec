"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Message', () => {
    (0, vitest_1.it)('should have a valid type', () => {
        const messageBody = {
            uri: "fakeIpfsString"
        };
        // Directly check the properties
        (0, vitest_1.expect)(Object.keys(messageBody).length).toBe(1);
        (0, vitest_1.expect)(messageBody).toHaveProperty('uri');
        (0, vitest_1.expect)(typeof messageBody.uri).toBe('string');
    });
});
