# Ice Audit  🌟

## Welcome

<p align="center" width="100%">
  <img src="https://github.com/GuildAudits/Audit-Reports-md/assets/58889001/1d6183d4-1ac6-4a6a-8f0b-c5491a22180b" alt="Ice"/>
</p>

> ## Table of contents
* [Overview](#overview)
* [ICE-03](#ICE-03)
* [ICE-04](#ICE-04)
* [ICE-14](#ICE-14)

#
 ## Overview

> Ice is a novel digital currency designed for mobile mining, fostering a community of users who aim to demonstrate the enduring value of digital assets. Operating on a trust-based community model, Ice allows users to join via invitations and participate in mining to build micro-communities. It emphasizes governance decentralization, enabling users to influence the network's evolution through distributed voting power. Noteworthy features include Tap in Advance, Slashing, Day Off, Resurrection, and Extra Bonuses based on activity.


#
 ## Audit Finding 1: ICE-03 - Centralization Risks in ICEToken.sol:

### Description:
> In the ICEToken contract, the _owner role holds authority over critical functions. If compromised, this _owner account could be exploited to modify configurations and transfer assets, akin to someone having a master key to a vending machine.

### Related Example:
> Imagine a vending machine where the _owner decides which snacks to include and their prices. If a malicious party gains access to this master key, they could manipulate the vending machine, altering prices or even taking all the snacks.

Code:
solidity

```
// In ICEToken.sol 
modifier onlyOwner() {
    require(msg.sender == _owner, "You are not the owner");
    _;
}
```


### Recommendation:
> To enhance security, introduce decentralized decision-making mechanisms. Similar to a vending machine benefitting from multiple keys, the Ice project could distribute authority to avoid a single point of control.

### Enhanced Recommendation (Based on ICE-03 Audit):

> For short-term improvements, consider a Timelock and Multi-signature combination. This adds a delay to sensitive operations and prevents a single point of key management failure. In the long term, combining Timelock and DAO (Decentralized Autonomous Organization) enhances decentralization and transparency.

### Alleviation (Based on ICE-03 Audit):
> The Ice team acknowledged the concern and updated privileged functions. CertiK recommends implementing the suggested methods and periodic reviews of private key security.

# 
 ## Audit Finding 2: ICE-04 - Potential DOS Attack

### Description:
> The contract triggers _swapBack() on every sell or transfer, making it susceptible to a Denial-of-Service (DOS) attack. A malicious user could disrupt transactions by transferring tokens under specific conditions.

### Related Example:
> Visualize the Ice project as a busy kitchen, transactions being cooking processes, and _swapBack() as a chef adding ingredients. If someone floods the kitchen with extra ingredients (tokens), it could lead to chaos.

Code:
solidity
```
// In ICEToken.sol
function _swapBack() internal {
    // ... other code

    if (address(this).balance > 0) {
        // If there's extra balance, send it to the operationsAddress
        (success,) = address(operationsAddress).call{value: address(this).balance}("");
    }
}
```

### Recommendation:
> To prevent chaos, the Ice project has measures in place. If the kitchen (contract) is already crowded, it won't accept more until it sorts out what's already there.

### Alleviation (Based on ICE-04 Audit):
> The Ice team acknowledged the issue, and CertiK suggests implementing the recommended methods to avoid centralized failure. Periodic reviews of key security are strongly encouraged.


#
 ## Audit Finding 3: ICE-14 - Pausing Centralization Risk
### Description:
> In the ICEToken contract, the _owner role has the authority to pause/resume token transfer functionality. A compromised _owner's private key could enable hackers to disable or enable transfers.

### Related Example:
> Imagine the _owner as the chef holding the power to pause or resume cooking processes in a kitchen. If this control is compromised, it's like giving someone the ability to disrupt or resume all kitchen activities.

### Recommendation:
> Improve the security operation and decentralization level. Short-term solutions include Timelock and Multi-signature. Long-term, incorporate Timelock and DAO for enhanced decentralization and transparency.

### Alleviation (Based on ICE-14 Audit):
> The Ice team resolved this issue by removing the pause feature in the updated version.


> ##### Readme Created by `Enebeli Emmanuel` for Ice Audit 1



