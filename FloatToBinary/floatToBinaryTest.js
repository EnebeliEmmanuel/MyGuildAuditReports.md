function floatToBinary(floatNumber, isDouble) {
    // Create a typed array based on the data type (float or double)
    const floatArray = isDouble ? new Float64Array([floatNumber]) : new Float32Array([floatNumber]);
  
    // Get the binary representation
    const binaryRepresentation = new Uint8Array(floatArray.buffer);
  
    // Convert each byte to binary and concatenate them
    const binaryString = Array.from(binaryRepresentation).map(byte => byte.toString(2).padStart(8, '0')).join('');
  
    return binaryString;
  }
  
  // Example usage
  const floatValue = 3.14;
  const binaryValue = floatToBinary(floatValue, false); // For single precision (float)
  console.log(`Binary representation of ${floatValue}: ${binaryValue}`);
  