# ACKNO LEDGER Audit  🌟

## Welcome

<p align="center" width="100%">
  <img src="https://github.com/EnebeliEmmanuel/MyGuildAuditReports.md/assets/58889001/27151b8d-c985-470a-a87f-b9906a1b822e" alt="Ice"/>
</p>

> ## Table of contents
* [Overview](#overview)
* [A.1](#A.1)
* [A.2](#A.2)
* [A.3](#A.3)
* [A.4](#A.4)




## Overview

> AcknoLedger is a global platform that uniquely maps, monetizes, and distributes Web 3.0 Digital Assets seamlessly across all Metaverses and Gaming NFTs. The audit was conducted by the QuillAudits team from October 26, 2021, to October 27, 2021. The source code for the audit was retrieved from the official GitHub repository at [GitHub Link].

### Vulnerability Summary

> The audit aims to identify and address potential vulnerabilities, ensuring that AcknoLedger's smart contracts meet high-security standards. The severity levels are categorized into High, Medium, Low, and Informational, each representing the criticality of the identified issues.

## Critical Risks 

> Description: Imagine building a thrilling roller coaster. A critical risk would be a flaw in the coaster's structure that could lead to a disastrous ride. In AcknoLedger's case, there were no such critical flaws. It's like ensuring the roller coaster is not just thrilling but also safe for everyone.

>Implication: No critical risks mean the smart contracts have a strong foundation, much like a roller coaster that promises both excitement and safety.

## Major Risks 

> Description: Think of major risks as potential bumps in the ride. They won't stop the roller coaster, but they could make the journey a bit shaky. AcknoLedger identified and fixed two such bumps during the audit.

> Implication: Resolving major risks is like ironing out those bumps, ensuring a smoother journey for users interacting with AcknoLedger.

## Medium Risks

> Description: Medium risks are like warning signs on the road. They indicate potential issues ahead. AcknoLedger found one such warning sign and promptly took care of it.

> Implication: Addressing medium risks is akin to removing those warning signs, making the road (smart contracts) safer and more user-friendly.

## Low Risks 

> Description: Low risks are minor issues, like a squeaky door. It's not a big problem, but fixing it would make things better. AcknoLedger has one such minor issue still open.

> Implication: While low-risk, addressing this issue is like oiling the squeaky door – a small improvement that adds to the overall user experience.

## Informational Errors 

> Description: Informational errors are suggestions for improvement, similar to feedback on a product. AcknoLedger received one suggestion and acted on it during the audit.

> Implication: Resolving informational errors is like implementing user feedback – making the smart contracts better based on constructive suggestions.

## In Essence

> So, in essence, an audit's severity is like ensuring your roller coaster isn't just thrilling but also a secure and smooth ride for everyone. Now, let's dive into the details and see how we can make this DeFi amusement park even better with the AcknoLedger Audit.

#
## A.1
### PUBLIC FUNCTION THAT COULD BE DECLARED EXTERNAL
- Category: Gas Efficiency and Coding Best Practices
- Severity: Informational
- Line Code: Not specified
  
**Understanding Informational Issues - External Declaration**:
> Imagine your contract is a busy marketplace, and there's a shopkeeper (function) sitting inside. If there are some shops (functions) that people never visit from inside the marketplace, declaring them as "external" is like placing those shops outside, saving resources and making the marketplace more efficient.

**Issue Overview**:
The AcknoLedger contract has public functions, such as setGovernance, that are never called within the contract. In the analogy, these functions are shops inside the marketplace that no one visits. To enhance gas efficiency, it is recommended to declare such functions as "external."

solidity
```
// Before Optimization
function setGovernance(address _governance) public {
    // Function logic...
}

// After Optimization
function setGovernance(address _governance) external {
    // Function logic...
}
```

**Recommendations and Updates**:
> To save gas and streamline the contract, the recommended practice is to declare public functions as "external" if they are not called from within the contract.

**Alleviation**:
> In version 2 of the AcknoLedger contract, the team acknowledged and implemented the recommended changes, declaring the functions, such as setGovernance, as "external." This optimization contributes to more efficient gas usage within the contract.

> The AcknoLedger team has successfully addressed this informational issue to enhance the contract's gas efficiency and overall performance.

#
## A.2
### MISSING EVENTS FOR SIGNIFICANT TRANSACTIONS
- Category: Event Implementation
- Severity: Medium
- Line Code: 28-31, 38-40


**Understanding Medium Severity - Missing Events**:
> Imagine your smart contract is a theater performance, and important actions (transactions) are like scenes in the play. If some significant scenes happen, but the audience (off-chain systems) doesn't know about them, it's like watching a silent play. Emitting events is like adding dialogue to those scenes, making the play more communicative.

**Issue Overview**:
> In the AcknoLedgerToken contract, crucial transactions, such as changing the governance variable, occur without emitting events. This is similar to crucial scenes in a play happening silently. To enhance transparency and allow off-chain systems to keep track, it is recommended to emit events for such significant transactions.

solidity
```
// Before Event Implementation
function setGovernance(address _governance) public onlyGovernance {
    governance = _governance;
}

// After Event Implementation
event GovernanceChanged(address indexed previousGovernance, address indexed newGovernance);

function setGovernance(address _governance) public onlyGovernance {
    emit GovernanceChanged(governance, _governance);
    governance = _governance;
}
```

**Recommendations and Updates**:
> To improve off-chain tracking and communication, the recommendation is to emit events for significant transactions, such as changes to the governance variable.

**Alleviation**:
> In version 2 of the AcknoLedgerToken contract, the team addressed this concern by emitting the appropriate events, enhancing the transparency of significant transactions. This improvement allows off-chain systems to keep track of important changes within the contract.

#
## A.3
### OPTIONAL INHERITANCE OF THE OWNABLE CONTRACT - STATUS: FIXED
- Category: Code Structure Improvement
- Severity: Low
- Line Code: 16
  
**Understanding Low Severity - Optional Inheritance**:
> Imagine having a toolbox with tools you never use. It's like carrying unnecessary weight. Similarly, in the AcknoLedgerToken contract, it inherited the Ownable contract, but our testing showed that none of Ownable's functions were used. This is akin to carrying a tool you never need. To optimize, consider leaving unnecessary tools behind.

**Issue Overview**:
> The AcknoLedgerToken contract inherited the Ownable contract, providing access to ownership-related functions. However, our analysis revealed that none of these functions were utilized within the AcknoLedgerToken contract. This introduced unnecessary complexity and increased the size of the code without providing tangible benefits.

solidity
```
// Before Code Structure Improvement
contract AcknoLedgerToken is ERC20Permit, Ownable {
    // Contract logic without utilizing Ownable functions
}

// After Code Structure Improvement
contract AcknoLedgerToken is ERC20Permit {
    // Contract logic without unnecessary inheritance
}
```

**Recommendations and Updates**:
> To streamline the code and reduce unnecessary complexity, it was recommended to remove the unnecessary inheritance of the Ownable contract.

**Alleviation**:
> In version 2 of the AcknoLedgerToken contract, the AcknoLedger team implemented the recommended changes. The unnecessary inheritance of the Ownable contract was removed, contributing to a more concise and efficient codebase.

#
## A.4
### MISSING ZERO ADDRESS VALIDATION - STATUS: FIXED
- Category: Security Enhancement
- Severity: Low
- Line Code: 38-40, 49-57
  
**Understanding Low Severity - Missing Zero Address Validation**:
**Picture this**: 
> You're sending a letter, but you forget to write the recipient's address. It's crucial to ensure your message reaches the right place. Similarly, when dealing with addresses in smart contracts, forgetting to check for zero addresses is like sending tokens to the void. It's better to make sure your tokens reach their intended destination.

**Issue Overview**:
> In the AcknoLedgerToken contract, two functions (setGovernance and recoverToken) involve address assignments. However, our analysis identified a potential vulnerability. When setting the governance or recovering tokens, the functions didn't check if the provided addresses were zero addresses. This lack of validation could lead to unintended consequences, such as loss of contract ownership or tokens being burnt if sent to a zero address.

solidity
```
// Before Security Enhancement
function setGovernance(address _governance) public onlyGovernance {
    governance = _governance;
}

function recoverToken(
    address token,
    address destination,
    uint256 amount
) external onlyGovernance {
    require(token != destination, "Invalid address");
    require(IERC20(token).transfer(destination, amount), "Retrieve failed");
    emit RecoverToken(token, destination, amount);
}

// After Security Enhancement
function setGovernance(address _governance) public onlyGovernance {
    require(_governance != address(0), "Zero address not allowed");
    governance = _governance;
}

function recoverToken(
    address token,
    address destination,
    uint256 amount
) external onlyGovernance {
    require(token != address(0), "Invalid token address");
    require(destination != address(0), "Invalid destination address");
    require(IERC20(token).transfer(destination, amount), "Retrieve failed");
    emit RecoverToken(token, destination, amount);
}
```

**Recommendations and Updates**:
> To enhance security, it was recommended to include require statements to check for zero addresses when setting governance and recovering tokens.

**Alleviation**:
> In version 2 of the AcknoLedgerToken contract, the AcknoLedger team implemented the recommended changes. The functions now include require statements to ensure that zero addresses are not allowed, mitigating potential vulnerabilities.



> ##### Readme Created by `Enebeli Emmanuel` for ACKNO-LEDGER






