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
* [ICE-15](#ICE-15)
* [ICT-02](ICT-02)

#
 ## Overview

> Ice is a novel digital currency designed for mobile mining, fostering a community of users who aim to demonstrate the enduring value of digital assets. Operating on a trust-based community model, Ice allows users to join via invitations and participate in mining to build micro-communities. It emphasizes governance decentralization, enabling users to influence the network's evolution through distributed voting power. Noteworthy features include Tap in Advance, Slashing, Day Off, Resurrection, and Extra Bonuses based on activity.

### Vulnerability Summary:
> Imagine you're in charge of building the most exciting roller coaster in the digital world – the Ice Blockchain. Just like any thrilling ride, you'd want to make sure it's not only fun but also safe for everyone. That's where our audit comes in – it's like the safety check for your roller coaster.

### Critical Risks (0):
> Picture this – before opening your roller coaster to the public, there's a critical issue with the safety harness. It's a potential disaster waiting to happen. No one should board until that's fixed. In the digital world, these are critical risks – the ones that demand immediate attention before launching any project. They're the red flags saying, "Hey, we need to fix this before we proceed."

### Major Risks (6 - 4 Resolved, 2 Acknowledged):
> Now, think of major risks as potential bumps in the ride. They won't stop the roller coaster, but they could make the journey a bit shaky. These risks might involve issues like how the roller coaster operates or who's in control. Some of these bumps have been ironed out (resolved), and others are acknowledged and on the to-do list.

### Medium Risks (1 - 1 Resolved):
> Moving on to medium risks, these are like speed bumps in the parking lot. They won't ruin your ride, but they might slow things down a bit. They don't directly mess with your funds, but they could affect how smoothly everything runs.

### Minor Risks (7 - 7 Resolved):
> Minor risks are like the small quirks in your favorite ride – maybe a creaky sound or a flickering light. They're not deal-breakers, and they won't spoil the overall experience, but addressing them can make the ride even more enjoyable.

### Informational Errors (1 - 1 Resolved):
> Lastly, think of informational errors as the equivalent of the ride operator suggesting a more comfortable seat. These are usually suggestions to make things look or work better without fundamentally changing the experience.

So, in essence, an audit's severity is like ensuring your roller coaster isn't just thrilling but also a safe and smooth ride for everyone. Now, let's dive into the details and see how we can make this amusement park even better with the Ice Blockchain Audit.


#
 ## ICE-03 
- ICE-03: Centralization Risks in ICEToken.sol
  ### Category: Centralization
- Severity: Major
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373)
- Status: Acknowledged
 ### Audit Finding 1:  Centralization Risks in ICEToken.sol:

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
 ## ICE-04 
 ### Audit Finding 2:  Potential DOS Attack
### Category: Logical Issue
- Severity: Major
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373)
- Status: Resolved
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
 ## ICE-14 
 ### Audit Finding 3:  Pausing Centralization Risk
### Category: Logical Issue
- Severity: Major
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373)
- Status: Resolved
### Description:
> In the ICEToken contract, the _owner role has the authority to pause/resume token transfer functionality. A compromised _owner's private key could enable hackers to disable or enable transfers.

### Related Example:
> Imagine the _owner as the chef holding the power to pause or resume cooking processes in a kitchen. If this control is compromised, it's like giving someone the ability to disrupt or resume all kitchen activities.

### Recommendation:
> Improve the security operation and decentralization level. Short-term solutions include Timelock and Multi-signature. Long-term, incorporate Timelock and DAO for enhanced decentralization and transparency.

### Alleviation (Based on ICE-14 Audit):
> The Ice team resolved this issue by removing the pause feature in the updated version.

#
## ICE-15
### Audit Finding 4: Centralized Balance Manipulation - Acknowledged
Category: Centralization
Severity: Major
Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373)
Status: Acknowledged

### Description:
> In the realm of the Ice Blockchain, picture the _owner role in the ICEToken contract as the financial wizard with the power to magically update token balances. Now, if this wizard's magic wand (private key) falls into the wrong hands, there's a risk of chaos. A mischievous hacker could, for instance, inflate their own token balance, flood the market with these tokens, and cause a price meltdown.

Recommendation and Updates:
> To secure this magical realm, we recommend strengthening the wizard's castle (account). The Ice Team, embracing the spirit of improvement, introduced a new character (_airDropper) to share the magical responsibilities, specifically handling the airdrop operations. This way, even if the wizard's magic wand is ever misplaced, the entire magical balance won't be at the mercy of a single sorcerer.

solidity
```
// In the updated version (commit hash: acb5dbb00eab45c41126279c7997acf33a5af0e1)
// New role introduced to replace _owner
address private _airDropper;

// Function to manage airdrop operations
function manageAirdrop() external onlyAirDropper {
    // Airdrop logic goes here
}
```

### Mitigation Strategies:
> For short-term precautions, think of it like the wizards forming a council (multi-signature wallet) to collectively protect the magic wand. They could also keep the community in the loop by sharing details of their magical decisions through a magical newspaper (medium/blog).

solidity
```
// Short-term: Multi-signature wallet
address[] private multiSigners;

modifier onlyMultiSigners() {
    require(isMultiSigner(msg.sender), "Not authorized");
    _;
}

function isMultiSigner(address account) public view returns (bool) {
    for (uint i = 0; i < multiSigners.length; i++) {
        if (multiSigners[i] == account) {
            return true;
        }
    }
    return false;
}
```


> In the long run, establishing a decentralized autonomous organization (DAO) would be akin to creating a magical senate, introducing transparency and involving the community in the decision-making process.

solidity
```
// Long-term: DAO
// Integrate a DAO module for decentralized governance
```
### Permanent Solution:
For a lasting solution, the Ice Team could consider renouncing the magical ownership or tweaking the magic spells (functions) to add extra layers of protection. This way, the magic remains potent without the risk of unintended wizardry.

solidity
```
// Permanent: Renounce ownership or add extra protection
// Implementing a renounceOwnership() function or enhancing protection mechanisms
```
### Alleviation:
> Acknowledging the importance of magic security, the Ice Team acted swiftly, replacing the _owner role with _airDropper in the updated version (commit hash: acb5dbb00eab45c41126279c7997acf33a5af0e1). This change ensures that the magical realm stays secure, preventing any unauthorized tweaking of balances and preserving the stability of the Ice Blockchain's mystical economy.

#
## ICT-02
### Audit Finding 5: Incorrect Usage of Slippage - Resolved
- Category: Logical Issue
- Severity: Major
- Location: ICEToken.sol (acb5db-12/13)
- Status: Resolved

### Understanding Slippage:
> Imagine you're at a bustling marketplace trading ICE tokens. Slippage is like setting a flexible price range for your trades. For instance, you're willing to pay up to $1 per ICE token, but due to market fluctuations, you might end up paying a bit more—this wiggle room is slippage.

### Issue Overview:
> In our marketplace, there was a glitch. Traders' calculators (the _addLiquidity() and _swapTokensForEth() functions) were outdated, causing them to sometimes miscalculate slippage. This could result in traders unknowingly paying more than they expected.

### Recommendation and Updates:
Think of this as upgrading those old calculators to more accurate ones. The Ice team can use a modern method (the quote() function) to ensure slippage is precisely calculated. Here's a simplified version of what that might look like:

solidity
```
// Recommended slippage calculation using quote() function
function calculateSlippage(uint256 tokenAmount, uint256 slippagePercentage) internal view returns (uint256) {
    // Use quote() function from router contract to calculate slippage
}
```
### Alleviation:
> The Ice Team swiftly recognized the importance of accurate calculators in our marketplace. In the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a), they removed the outdated calculators, ensuring that slippage is now calculated accurately.



> ##### Readme Created by `Enebeli Emmanuel` for Ice Audit 1



