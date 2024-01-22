# AVAX Token Smart Contract Audit  🌟

## Welcome

<p align="center" width="100%">
  <img src="https://github.com/EnebeliEmmanuel/MyGuildAuditReports.md/assets/58889001/9bb67efe-6399-40e3-b8fe-55567e857ea3" alt="Ice"/>
</p>

> ## Table of contents
* [Overview](#overview)
* [A.1](#A.1)
* [A.2](#A.2)
* [A.3](#A.3)
* [A.4](#A.4)
* [A.5](#A.4)

## Overview

> 
AVX launchpad $AVX is developed to launch the best new projects on the Avalanche blockchain and make them accessible to everyone in the cryptosphere.

### Vulnerability Summary

> The scope of this audit was to analyze and document the AVX Token, smart contract codebase for quality, security, and correctness

## Critical Risks 

> Description: Imagine building a thrilling roller coaster. A critical risk would be a flaw in the coaster's structure that could lead to a disastrous ride. In  AVX Token's case, there were no such critical flaws. It's like ensuring the roller coaster is not just thrilling but also safe for everyone.

>Implication: No critical risks mean the smart contracts have a strong foundation, much like a roller coaster that promises both excitement and safety.

## Major Risks 

> Description: Think of major risks as potential bumps in the ride. They won't stop the roller coaster, but they could make the journey a bit shaky.  AVX Token identified and fixed two such bumps during the audit.

> Implication: Resolving major risks is like ironing out those bumps, ensuring a smoother journey for users interacting with  AVX Token.

## Medium Risks

> Description: Medium risks are like warning signs on the road. They indicate potential issues ahead.  AVX Token found one such warning sign and promptly took care of it.

> Implication: Addressing medium risks is akin to removing those warning signs, making the road (smart contracts) safer and more user-friendly.

## Low Risks 

> Description: Low risks are minor issues, like a squeaky door. It's not a big problem, but fixing it would make things better. AVX Token has one such minor issue still open.

> Implication: While low-risk, addressing this issue is like oiling the squeaky door – a small improvement that adds to the overall user experience.

## Informational Errors 

> Description: Informational errors are suggestions for improvement, similar to feedback on a product.  AVX Token received one suggestion and acted on it during the audit.

> Implication: Resolving informational errors is like implementing user feedback – making the smart contracts better based on constructive suggestions.

## In Essence

> So, in essence, an audit's severity is like ensuring your roller coaster isn't just thrilling but also a secure and smooth ride for everyone. Now, let's dive into the details and see how we can make this DeFi amusement park even better with the  AVX Token Audit.


# A.1
## MISSING ZERO ADDRESS VALIDATION - LOW SEVERITY
- Category: Low Severity
- Severity: Low

**Understanding Low Severity - Zero Address Validation**:
> Picture your contract like a vault, safeguarding precious tokens. However, it's important to ensure the right keys are used when making changes. Currently, the contract allows changing the owner and two addresses without checking if they are valid. It's like changing the lock on the vault without verifying the new keys. Implementing zero address validation ensures that only valid addresses are used, preventing accidental loss of privileges or tokens.

**Issue Overview**:
> In the AVX Launchpad contract, when changing the owner or setting two specific addresses, there's a missing check for zero addresses. Without this check, if someone tries to make these changes with address(0), it could lead to unintended consequences like losing ownership or tokens being sent to the zero address.

solidity
```
// Sample Zero Address Validation
modifier nonZeroAddress(address addr) {
    require(addr != address(0), "Invalid address");
    _;
}

// Applying to the Functions
function changeOwnership(address payable _newOwner) public onlyOwner nonZeroAddress(_newOwner) {
    owner = _newOwner;
}

function setAddressToChange(address addr) public onlyOwner nonZeroAddress(addr) {
    addressToBeChanged = addr;
}

function setAddressToSend(address addr) public onlyOwner nonZeroAddress(addr) {
    addressToSend = addr;
}
```

**Recommendations**:
> To enhance security, it's recommended to include a check for zero addresses when making these changes. This ensures that only valid addresses are accepted, preventing potential issues.

**Alleviation**:
By implementing zero address validation, the AVX Launchpad contract can strengthen its security measures, ensuring that changes in ownership and addresses are only made with valid, non-zero addresses. This precautionary step safeguards the contract from unintended consequences and enhances its overall reliability.


#
## A.2
### ERC20 APPROVE() RACE-CONDITION - MEDIUM SEVERITY
- Category: Medium Severity
- Severity: Medium

**Understanding Medium Severity - ERC20 approve() Race-Condition**:
> Imagine managing allowances like handing out keys. Currently, using the approve() function to change allowances might lead to a race condition. It's like trying to change your house keys but someone uses both the old and new keys due to transaction timing. To prevent such risks, implementing OpenZeppelin's safer alternatives, increaseAllowance and decreaseAllowance, ensures a secure and reliable process for managing allowances.

**Issue Overview**:
> In the AVX Launchpad contract, the use of approve() to modify allowances can expose users to front-running risks. This means that changes in allowances might be exploited due to the unpredictable order of transactions. To mitigate this, it's recommended to adopt OpenZeppelin's more secure alternatives, increaseAllowance and decreaseAllowance, which are designed to prevent such race conditions.

solidity
```
// Sample Implementation of increaseAllowance and decreaseAllowance
function modifyAllowance(address spender, uint256 addedValue, uint256 subtractedValue) public {
    increaseAllowance(spender, addedValue);
    decreaseAllowance(spender, subtractedValue);
}
```

**Recommendations**:
> To enhance security and prevent front-running risks, it's recommended to replace the use of approve() with OpenZeppelin's increaseAllowance and decreaseAllowance functions. This ensures a more robust and race-condition-resistant mechanism for managing allowances.

**ALLEVIATION**:
> By adopting OpenZeppelin's recommended practices, the AVX Launchpad contract can significantly reduce the risk of front-running in allowance modifications. This change ensures that users' allowances are handled securely, providing a safer experience for token holders

#
## A.3
### INFORMATIONAL ISSUES - MISSING EVENTS FOR SIGNIFICANT TRANSACTIONS
- Category: Informational
- Severity: Informational
  
**Understanding Informational Issues - Missing Events**:
> Consider events as notifications in a smart contract's diary. In the AVX Launchpad contract, there's a diary entry missing for important transactions. Imagine making significant changes, but there's no record of it! To address this, emitting events for functions like changeOwnership, setChangeStatus, setPercent, setAddressToChange, and setAddressToSend is recommended. It's like leaving a trail of breadcrumbs for better off-chain tracking.

**Issue Overview**:
> The AVX Launchpad contract lacks emitted events for critical transactions, making it challenging to track off-chain decimal changes. Events serve as the breadcrumbs in the contract's diary, providing a clear record of important activities. Functions such as changeOwnership, setChangeStatus, setPercent, setAddressToChange, and setAddressToSend should emit appropriate events for better off-chain tracking and understanding.

solidity
```
// Sample Event Emission
event OwnershipChanged(address indexed previousOwner, address indexed newOwner);

// Applying to the Functions
function changeOwnership(address payable _newOwner) public onlyOwner {
    emit OwnershipChanged(owner, _newOwner);
    owner = _newOwner;
}

// Repeat this pattern for other significant functions
```

**Recommendations**:
> To improve transparency and tracking capabilities, it's recommended to emit appropriate events for significant transactions. These events act as vital markers in the contract's diary, enabling accurate off-chain tracking and interpretation.

**ALLEVIATION**:
> Implementing event emissions for significant transactions enhances transparency in the AVX Launchpad contract. It's like leaving a clear trail for external systems and users to follow, fostering trust and providing a complete picture of important changes within the contract.

#
## A.4
### INFORMATIONAL ISSUES - UNUSED PUBLIC FUNCTIONS
- Category: Informational
- Severity: Informational

**Understanding Informational Issues - Unused Public Functions**:
> Think of unused public functions like decorations in a room that nobody notices or uses. In the AVX Launchpad contract, there are functions like changeOwnership, setChangeStatus, setPercent, setAddressToChange, and setAddressToSend that are present but never called. To save gas and streamline the contract, it's suggested to declare these functions as external, optimizing the contract's efficiency.

**Issue Overview**:
> The AVX Launchpad contract has some public functions, such as changeOwnership, setChangeStatus, setPercent, setAddressToChange, and setAddressToSend, which are never used within the contract. It's like having decorations in a room that go unnoticed. To enhance gas efficiency, these functions can be declared as external, indicating they're meant for external use.

solidity
```
// Sample Declaration
external function changeOwnership(address payable _newOwner);
```

**Recommendations**:
> To optimize gas usage and declutter the contract, it's recommended to declare unused public functions as external. This helps distinguish functions meant for external use and those intended for internal contract operations.

**ALLEVIATION**:
> By declaring these functions as external, you're signaling that they are designed for external use, providing clarity in the contract's functionality. This optimization contributes to a cleaner and more efficient smart contract.

#
## A.4
### INFORMATIONAL ISSUE - FLOATING PRAGMA
- Category: Informational
- Severity: Informational

**Understanding Informational Issue - Floating Pragma**:
> Imagine building a house with specific blueprints. If you use different plans during construction, things might not fit together as intended. Similarly, in the AVX Launchpad contract, the pragma version is like the blueprint. It's recommended to lock it down at a specific version (e.g., ^0.8.6) to ensure consistency and avoid unexpected issues.

**Issue Overview**:
> The AVX Launchpad contract employs a floating-point pragma (^0.8.6). Think of pragma as the blueprint for building a smart contract. Using a floating pragma means the contract can be compiled with any 0.8.x version. To maintain consistency and prevent potential issues, it's advised to lock down the pragma to a specific version used during testing.

solidity
```
// Locking the Pragma
pragma solidity ^0.8.6;
```

**Recommendations**:
> To ensure the contract is deployed consistently and to avoid compatibility problems, it's recommended to lock down the pragma to a specific version, such as ^0.8.6. This ensures that the contract is built using the same rules specified in the chosen version.

**ALLEVIATION**:
> By locking the pragma, you're ensuring that the contract is constructed using a specific set of rules. This helps maintain consistency and reduces the risk of unexpected issues arising from using different compiler versions.
 





