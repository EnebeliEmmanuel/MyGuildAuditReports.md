# Julius Caesar Cipher Encoder/Decoder   🌟

## Welcome

<p align="center" width="100%">
  <img src="https://github.com/EnebeliEmmanuel/MyGuildAuditReports.md/assets/58889001/4b95ee36-93e8-4922-9693-6572f8c0dcab" alt="Ice"/>
</p>

> ## Table of contents
* [Overview](#overview)
* [JavaScriptCode](#JavaScriptCode)
* [Explanation](#Explanation)
* [ExampleUsage](#ExampleUsage)
* [Summary](#Summary)

## Overview
> Step into the world of cryptography with our Julius Caesar Cipher Encoder/Decoder! Encrypt and decrypt messages using a timeless technique that Julius Caesar himself used. In this adventure, we'll explore the magic of shifting letters by five positions backward, creating a secret language between you and your friends.

JavaScriptCode
javascript
```
// Function to encrypt a message using Julius Caesar cipher with a five-shift backward
function encrypt(message, shift) {
  let encryptedMessage = "";

  // Iterate through each character in the message
  for (let i = 0; i < message.length; i++) {
    let char = message[i];

    // Check if the character is alphabetic
    if (/[a-zA-Z]/.test(char)) {
      // Determine the ASCII offset based on the case (uppercase or lowercase)
      let offset = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);

      // Encrypt the character and add it to the result
      let encryptedChar = String.fromCharCode((char.charCodeAt(0) - offset - shift + 26) % 26 + offset);
      encryptedMessage += encryptedChar;
    } else {
      // Keep non-alphabetic characters unchanged
      encryptedMessage += char;
    }
  }

  // Return the encrypted message
  return encryptedMessage;
}

// Function to decrypt an encrypted message using Julius Caesar cipher with a five-shift backward
function decrypt(encryptedMessage, shift) {
  // Decryption is the same as encryption with a negative shift
  return encrypt(encryptedMessage, -shift);
}
```
## Explanation
**Encrypting a Message**:

> The encrypt function iterates through each character in the message.
> For each alphabetic character, it calculates the new character by shifting it five positions backward in the alphabet. Non-alphabetic characters remain unchanged.
> The result is an encrypted message, where each letter is replaced by another letter five positions earlier in the alphabet.

**Decrypting an Encrypted Message**:

> The decrypt function utilizes the encrypt function with a negative shift to reverse the encryption.
> It takes the encrypted message and the negative shift value as parameters.

The result is the original message.

## Example Usage
javascript
```
const originalMessage = "Julius Caesar cipher ";
const shift = 5;

const encryptedMessage = encrypt(originalMessage, shift);
console.log(`Encrypted message: ${encryptedMessage}`);

const decryptedMessage = decrypt(encryptedMessage, shift);
console.log(`Decrypted message: ${decryptedMessage}`);
```

<p align="center" width="100%">
  <img src="https://github.com/EnebeliEmmanuel/MyGuildAuditReports.md/assets/58889001/686a95df-25be-4b63-a4b3-6282d116aebf" alt="Ice"/>
</p>
ht


## Summary
> Our Julius Caesar Cipher Encoder/Decoder empowers you to send and receive secret messages, just like the legendary Julius Caesar. The encrypt function transforms a message into a secret code, and the decrypt function decodes it. It's a journey into the ancient art of cryptography, where a simple shift can create a secret language between friends.
