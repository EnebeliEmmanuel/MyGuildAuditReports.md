# ACKNO LEDGER Audit  🌟

## Welcome

<p align="center" width="100%">
  <img src="https://github.com/EnebeliEmmanuel/MyGuildAuditReports.md/assets/58889001/27151b8d-c985-470a-a87f-b9906a1b822e" alt="Ice"/>
</p>

> ## Table of contents
* [Overview](#overview)
* [B.1](#B.1)
* [B.2](#B.2)
* [B.3](#B.3)
* [B.4](#B.4)
* [B.5](#B.5)



## Overview

> AcknoLedger is a global platform that uniquely maps, monetizes, and distributes Web 3.0 Digital Assets seamlessly across all Metaverses and Gaming NFTs. The audit was conducted by the QuillAudits team from October 26, 2021, to October 27, 2021. The source code for the audit was retrieved from the official GitHub repository at [GitHub Link].

### Vulnerability Summary

> The audit aims to identify and address potential vulnerabilities, ensuring that AcknoLedger's smart contracts meet high-security standards. The severity levels are categorized into High, Medium, Low, and Informational, each representing the criticality of the identified issues.

## Critical Risks (No Critical Risks Found)

> Description: Imagine building a thrilling roller coaster. A critical risk would be a flaw in the coaster's structure that could lead to a disastrous ride. In AcknoLedger's case, there were no such critical flaws. It's like ensuring the roller coaster is not just thrilling but also safe for everyone.

>Implication: No critical risks mean the smart contracts have a strong foundation, much like a roller coaster that promises both excitement and safety.

## Major Risks (2 - 2 Resolved)

> Description: Think of major risks as potential bumps in the ride. They won't stop the roller coaster, but they could make the journey a bit shaky. AcknoLedger identified and fixed two such bumps during the audit.

> Implication: Resolving major risks is like ironing out those bumps, ensuring a smoother journey for users interacting with AcknoLedger.

## Medium Risks (1 - 1 Resolved)

> Description: Medium risks are like warning signs on the road. They indicate potential issues ahead. AcknoLedger found one such warning sign and promptly took care of it.

> Implication: Addressing medium risks is akin to removing those warning signs, making the road (smart contracts) safer and more user-friendly.

## Low Risks (1 - Open)

> Description: Low risks are minor issues, like a squeaky door. It's not a big problem, but fixing it would make things better. AcknoLedger has one such minor issue still open.

> Implication: While low-risk, addressing this issue is like oiling the squeaky door – a small improvement that adds to the overall user experience.

## Informational Errors (1 - Resolved)

> Description: Informational errors are suggestions for improvement, similar to feedback on a product. AcknoLedger received one suggestion and acted on it during the audit.

> Implication: Resolving informational errors is like implementing user feedback – making the smart contracts better based on constructive suggestions.

## In Essence

> So, in essence, an audit's severity is like ensuring your roller coaster isn't just thrilling but also a secure and smooth ride for everyone. Now, let's dive into the details and see how we can make this DeFi amusement park even better with the AcknoLedger Audit.


#
## B.1 
**Audit Finding 1**: CENTRALIZATION RISKS - Acknowledged
- Category: Governance and Security
- Severity: Medium
- Location: UsingLiquidityProtectionService.sol
- Status: Acknowledged by the Auditee

**Understanding Centralization Risks**:
> In the world of decentralized finance (DeFi), it's essential to avoid a single point of control, much like having a central authority governing a system. Centralization risks involve the concentration of power, potentially undermining the principles of decentralization.

**Issue Overview**:
> In the context of AcknoLedger's smart contract, the role owner possesses extensive authority, allowing them to:

solidity
```
function transferFunds(address from, address to, uint256 amount) external onlyOwner {
    // Transfer funds from one address to another
}

function unblockHolder(address holder) external onlyOwner {
    // Unblock a previously blocked holder
}

function turnOffLiquidityProtection() external onlyOwner {
    // Disable liquidity protection
}
```

> This concentration of power in the owner's hands raises concerns about centralization, as a single entity can perform critical functions without broader consensus.

**Recommendation and Updates**:
> To address centralization risks, the recommendation is for the client to implement safeguards and distribute decision-making authority. Possible solutions include:

**Time-lock Mechanism**: Introduce time delays for certain privileged operations, allowing the community time to become aware and react.

**Multisignature (Multisig) Wallet**: Implement a multisig wallet, requiring multiple signatures (approvals) for significant operations. Community-elected third-party co-signers enhance decentralization.

**DAO or Governance Module**: Establish a Decentralized Autonomous Organization (DAO) or a governance module that enables community members to participate in decision-making processes.

**Alleviation**:
> Let's imagine the smart contract as a community-driven organization, where decisions are collectively made by participants. The suggested measures work as checks and balances, preventing any single entity from having unchecked power. It's like ensuring that decisions impacting the community undergo a thoughtful and distributed decision-making process, aligning with the principles of decentralization in DeFi. While the risks are acknowledged, implementing these recommendations mitigates concerns and contributes to a more secure and community-driven protocol.


#
## B.2 
**Audit Finding 2**: MISSING ZERO ADDRESS CHECK - Partially Fixed
- Category: Safety and Validation
- Severity: Low
- Location: UsingLiquidityProtectionService.sol
- Status: Partially Fixed
  
**Understanding Missing Zero Address Check**:
> Think of the smart contract as a vending machine that accepts different types of coins to provide a service. In our case, this vending machine is the UsingLiquidityProtectionService contract, and the coins are addresses used as inputs. Just as you'd want the vending machine to properly handle and validate the coins it receives, our contract needs to handle addresses correctly.

**Issue Overview**:
> Our vending machine has a couple of slots for accepting addresses (_plps and _revokeTo), but it doesn't check if the addresses are valid or if someone accidentally puts in an empty slot (zero address). This lack of validation could lead to unexpected issues, similar to a vending machine accepting invalid or non-existent coins.

solidity
```
function LiquidityProtection_setLiquidityProtectionService(IPLPS _plps)
    external onlyProtectionAdmin() {
    // Missing zero address check
    plps = _plps;
}

function revokeBlocked(address[] calldata _holders, address _revokeTo)
    external onlyProtectionAdmin() {
    // Missing zero address check
    require(isProtected(), 'UsingLiquidityProtectionService: protection removed');
    bool unProtectedOld = unProtected;
    unProtected = true;
    address pool = getLiquidityPool();
    for (uint i = 0; i < _holders.length; i++) {
        address holder = _holders[i];
        if (lps().isBlocked(pool, holder)) {
            token_transfer(holder, _revokeTo, token_balanceOf(holder));
        }
    }
    unProtected = unProtectedOld;
}
```

> It's like the vending machine not checking if the coins are real currency or if someone mistakenly tries to use a fake coin. This oversight could lead to problems, just as the smart contract could face issues without proper zero address checks.

**Recommendation and Updates**:
> To fix this, we recommend adding a simple check to ensure that the addresses are valid. It's like the vending machine checking each coin to make sure it's a genuine currency before accepting it.

solidity
```
function LiquidityProtection_setLiquidityProtectionService(IPLPS _plps)
    external onlyProtectionAdmin() {
    // Zero address check
    require(_plps != address(0), 'UsingLiquidityProtectionService: Invalid zero address');
    plps = _plps;
}

function revokeBlocked(address[] calldata _holders, address _revokeTo)
    external onlyProtectionAdmin() {
    // Zero address check
    require(_revokeTo != address(0), 'UsingLiquidityProtectionService: Invalid zero address');
    require(isProtected(), 'UsingLiquidityProtectionService: protection removed');
    bool unProtectedOld = unProtected;
    unProtected = true;
    address pool = getLiquidityPool();
    for (uint i = 0; i < _holders.length; i++) {
        address holder = _holders[i];
        if (lps().isBlocked(pool, holder)) {
            token_transfer(holder, _revokeTo, token_balanceOf(holder));
        }
    }
    unProtected = unProtectedOld;
}
```
> It's like upgrading the vending machine to ensure that only real, valid coins are accepted, preventing potential issues.

**Alleviation**:
> The team has taken steps to improve one part of the vending machine (one of the functions) in version 2, but there's still room for further improvement. By applying these changes, the vending machine becomes more reliable, handling addresses correctly and avoiding potential problems associated with zero addresses.

#
## B.3 
**Audit Finding 3**: UNREADABLE CODE - Acknowledged
- Category: Code Readability and Verification
- Severity: Informational
- Location: AcknoLedgerToken.sol
- Status: Acknowledged by the Auditee
  
**Understanding Unreadable Code**:
> Imagine reading a book where some pages are blurry or missing. It's hard to follow the storyline, right? Similarly, in smart contracts, having unreadable or unverified code is like encountering a book with unclear pages. It introduces uncertainty and makes it challenging to ensure everything is working as expected.

**Issue Overview**:
> Our smart contract, AcknoLedgerToken, has sections of code that are not easily readable. Additionally, it relies on another contract (at address 0x9Ce6edF92a34ec4ee9311d9518c11Ee164b998CC) for processing token transfers, and this external contract's code is not verified. This is like having a part of our book written in a language we can't understand, and some critical pages are missing.

solidity
```
contract AcknoLedgerToken is ERC20Permit, Ownable,
UsingLiquidityProtectionService(0x9Ce6edF92a34ec4ee9311d9518c11Ee164b998CC){
    function _beforeTokenTransfer(address _from, address _to, uint _amount)
    internal override {
        super._beforeTokenTransfer(_from, _to, _amount);
        LiquidityProtection_beforeTokenTransfer(_from, _to, _amount);
    }
}
```

**Recommendations and Updates**:
**Code Verification**:
> It's recommended to verify the code of the external contract (at address 0x9Ce6edF92a34ec4ee9311d9518c11Ee164b998CC) on the explorer. This is like ensuring that the missing pages in our book are provided, and we can understand every part of the story.

**Pragma Locking**:
> The contract uses the floating-point pragma ^0.8.0, and it's suggested to lock the pragma to a specific version. This ensures that the contract is consistently compiled with the same compiler version and flags used during testing. It's akin to using the same language and font throughout our entire book.

solidity
```
// Example of pragma locking
pragma solidity 0.8.0;
contract AcknoLedgerToken is ERC20Permit, Ownable,
UsingLiquidityProtectionService(0x9Ce6edF92a34ec4ee9311d9518c11Ee164b998CC){
    function _beforeTokenTransfer(address _from, address _to, uint _amount)
    internal override {
        super._beforeTokenTransfer(_from, _to, _amount);
        LiquidityProtection_beforeTokenTransfer(_from, _to, _amount);
    }
}
```

**Alleviation**:
> The Auditee has acknowledged this informational issue, indicating awareness of the need to improve code readability and consider code verification for external contracts. This acknowledgment is like recognizing the importance of making our book more readable and ensuring all the pages are there for a complete and clear narrative.

#
## B.4 
**Audit Finding 4**: FLOATING PRAGMA - Fixed
- Category: Pragma and Compiler Settings
- Severity: Informational
- Line Code: 2
- Status: Fixed in version 2
  
**Understanding Floating Pragma**:
> In the world of smart contracts, the pragma version is like specifying the language and rules for writing a story. Using a floating pragma version (^0.8.0) is akin to allowing different editions of the rulebook to be used, which can introduce inconsistencies. Locking the pragma version ensures that everyone reads and follows the same set of rules throughout the story.

**Issue Overview**:
> The contract uses a floating-point pragma (^0.8.0), indicating flexibility in the compiler version used for deployment. This flexibility might lead to unintentional deployment using a different pragma version, potentially causing issues similar to using different editions of a rulebook.

solidity
```
// Example of pragma locking
pragma solidity ^0.8.0;
contract AcknoLedgerToken is ERC20Permit, Ownable,
UsingLiquidityProtectionService(0x9Ce6edF92a34ec4ee9311d9518c11Ee164b998CC){
    function _beforeTokenTransfer(address _from, address _to, uint _amount)
    internal override {
        super._beforeTokenTransfer(_from, _to, _amount);
        LiquidityProtection_beforeTokenTransfer(_from, _to, _amount);
    }
}
```

**Recommendations and Updates**:
**Pragma Locking**:
> It's recommended to lock the pragma version to a specific version (e.g., pragma solidity 0.8.0) to ensure consistent deployment with the same compiler version used during testing. This is like ensuring that everyone follows the same set of rules in our story.

**Alleviation**:
> The team has acknowledged this informational issue and fixed it in version 2 by locking the pragma version. This fix ensures that the contract is deployed consistently, preventing potential issues that might arise from using different pragma versions. The pragma is now locked, providing a stable and reliable foundation for the contract's narrative.

#
## B.5 
**Audit Finding 5**: EXTERNAL CALLS INSIDE A LOOP - Acknowledged
- Category: Code Logic and Gas Efficiency
- Severity: Informational
- Line Code: 75-80
- Status: Acknowledged by the Auditee
  
**Understanding External Calls Inside a Loop**:
> Imagine you're distributing invitations to a party, and for each invitation, you have to make a call to the venue to check if the guest is allowed. Making these calls for each guest in a loop without any limits could be tiring and risky. Similarly, in smart contracts, making external calls inside a loop without precautions might lead to inefficiencies and potential issues.

**Issue Overview**:
> The loop inside the revokeBlocked() function traverses the _holders array, and for each element, an external call to the Liquidity Protection Service (LPS) contract is made. This approach can be problematic, especially if the array is extensive or if the external contract's logic is complex. It's like checking the validity of each invitation individually without considering potential challenges.

solidity
```
for (uint i = 0; i < _holders.length; i++) {
    address holder = _holders[i];
    if (lps().isBlocked(pool, holder)) {
        token_transfer(holder, _revokeTo, token_balanceOf(holder));
    }
}
```

**Recommendations and Updates**:
**Upper Bound on Array Size**:
> Implement an upper bound on the size of the _holders array to control the number of external calls within a reasonable limit. This is akin to managing the guest list size to ensure a smoother party organization.

**External Call Logic Check**:
> Review and ensure the logic of external calls to the LPS contract is optimized and won't lead to out-of-gas errors. It's like confirming that checking each guest's validity won't overwhelm the party venue staff.

**Alleviation**:
> The Auditee has acknowledged this informational issue, indicating awareness of the potential considerations related to external calls inside a loop. While no specific fixes were mentioned, it highlights a conscious approach to managing the loop structure and external calls for optimal gas efficiency and contract performance.


#
## B.6 
**Audit Finding 6**: REDUNDANT VARIABLE INITIALIZATION
- Category: Gas Efficiency and Coding Best Practices
- Severity: Informational
- Line Code: 9
  
**Understanding Redundant Variable Initialization**:
> Consider preparing for a day out, and you bring an umbrella even though the weather forecast assures a sunny day. Initializing a variable with its default value when it's unnecessary is akin to carrying that umbrella, consuming resources without adding real value.

**Issue Overview**:
> In the smart contract, the boolean variable unProtected is explicitly initialized with false at the beginning. However, in Solidity, if a boolean variable is not explicitly set, it automatically takes the default value of false. Explicitly setting it to false is redundant and consumes unnecessary gas.

solidity
```
bool private unProtected = false;
```

**Recommendations and Updates**:
> The recommended practice is not to explicitly initialize the variable with its default value when it matches the default value of the data type. In this case, since unProtected is a boolean, and its default value is false, the explicit initialization is redundant.

**Alleviation**:
> To optimize gas usage and adhere to coding best practices, it is advised to remove the explicit initialization of unProtected if it matches the default value of false for a boolean variable.





