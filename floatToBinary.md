# floatToBinary  🌟

## Welcome

<p align="center" width="100%">
  <img src="https://github.com/EnebeliEmmanuel/MyGuildAuditReports.md/assets/58889001/254efe35-b421-43f4-955b-96370a2e54f9" alt="Ice"/>
</p>

> ## Table of contents
* [Overview](#overview)

## Overview
> Imagine you have a secret recipe for your favorite cake, and you want to share it with a friend in a special code. You convert each ingredient and instruction into a numeric code, creating a secret language only you and your friend understand.Now, let's imagine your friend is a computer, and the regular language is the language we use every day. Computers, however, have their own special language of 0s and 1s. Just like you translated the cake recipe into a numeric code, computers translate regular numbers into binary code.In this analogy, converting a floating-point number to binary is like looking at the "secret code" version of the number, revealing how computers internally store and process numbers. We use a special tool (floatToBinary function) to understand this translation. For example, if the regular number is 3.14, the tool shows its binary representation – a sneak peek into how computers talk in their unique language.

### javascript
```
const floatValue = 3.14;
const binaryValue = floatToBinary(floatValue, false); // For single precision (float)
console.log(`Binary representation of ${floatValue}: ${binaryValue}`);
```
> Just like your friend decodes the secret recipe to make the cake, computers use this binary code to process and store numbers. It's like discovering a hidden world where numbers speak a different language, and the floatToBinary function is our guide to understanding this digital dialect.


**Function**: floatToBinary
### javascript
```
function floatToBinary(floatNumber, isDouble) {
  // Create a typed array based on the data type (float or double)
  const floatArray = isDouble ? new Float64Array([floatNumber]) : new Float32Array([floatNumber]);

  // Get the binary representation
  const binaryRepresentation = new Uint8Array(floatArray.buffer);

  // Convert each byte to binary and concatenate them
  const binaryString = Array.from(binaryRepresentation).map(byte => byte.toString(2).padStart(8, '0')).join('');

  return binaryString;
}
```
**Explanation**:
**Create a Typed Array**:

> A typed array is created using Float32Array or Float64Array based on the isDouble parameter. If isDouble is true, it creates a Float64Array for double-precision; otherwise, it creates a Float32Array for single-precision.

**Why**: 
> Typed arrays provide a way to work with raw binary data in JavaScript. These arrays are capable of holding fixed-size binary data, making them suitable for handling floating-point numbers in binary format.

**Get the Binary Representation**:

> The function then accesses the underlying buffer of the typed array using floatArray.buffer and creates a new Uint8Array from it. The Uint8Array represents the binary data of the floating-point number.

**Why**: The buffer property of a typed array allows direct access to the binary data. Converting the floating-point number to a Uint8Array allows us to work with the individual bytes of its binary representation.

**Convert Bytes to Binary String**:

> The code uses Array.from(binaryRepresentation) to convert the Uint8Array to an array of bytes. For each byte, it converts it to a binary string using byte.toString(2). The padStart(8, '0') ensures that each binary string has 8 digits, representing a byte.

> Finally, it joins the binary strings of each byte to form the complete binary representation of the floating-point number.

**Why**: Converting each byte to a binary string is necessary to represent the binary data accurately. Padding ensures that each byte is represented by 8 bits.

**Return Binary String**:

> The resulting binary string is returned as the output of the function.

**Why**: This allows the user to easily obtain the binary representation of a floating-point number.


**Summary**:
> The function floatToBinary converts a floating-point number to its binary representation by leveraging JavaScript typed arrays. It takes into account the precision of the floating-point number and accurately represents its binary form, providing a useful utility for developers working with low-level binary data in JavaScript. The steps involve creating a typed array, accessing its binary buffer, converting bytes to binary strings, and concatenating them to obtain the final binary representation.
