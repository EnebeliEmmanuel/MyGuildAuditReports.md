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
  
  // Example Usage:
  const originalMessage = " Julius Caesar cipher ";
  const shift = 5;
  
  // Encrypt the message
  const encryptedMessage = encrypt(originalMessage, shift);
  console.log(`Encrypted message: ${encryptedMessage}`);
  
  // Decrypt the message
  const decryptedMessage = decrypt(encryptedMessage, shift);
  console.log(`Decrypted message: ${decryptedMessage}`);
  