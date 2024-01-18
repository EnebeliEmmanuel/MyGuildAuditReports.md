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
* [ICT-03](ICT-03)
* [ICE-18](ICE-18)
* [CET-01](CET-01)
* [ICE-06](ICE-06)
* [ICE-07](ICE-07)
* [ICE-08](ICE-08)
* [ICE-09](ICE-09)
* [ICE-11](ICE-11)
* [ICE-17](ICE-17)
* [ICE-13](ICE-13)
* [ICE-01](ICE-01)

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
> Think of this as upgrading those old calculators to more accurate ones. The Ice team can use a modern method (the quote() function) to ensure slippage is precisely calculated. Here's a simplified version of what that might look like:

solidity
```
// Recommended slippage calculation using quote() function
function calculateSlippage(uint256 tokenAmount, uint256 slippagePercentage) internal view returns (uint256) {
    // Use quote() function from router contract to calculate slippage
}
```
### Alleviation:
> The Ice Team swiftly recognized the importance of accurate calculators in our marketplace. In the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a), they removed the outdated calculators, ensuring that slippage is now calculated accurately.


#
## ICT-03
### Audit Finding 6: Potential Flashloan Attack - Resolved
- Category: Design Issue
- Severity: Major
- Location: ICEToken.sol (acb5db-12/13)
- Status: Resolved

### Understanding Flashloan Attack:
> In our marketplace, users can borrow funds temporarily (a flashloan) to manipulate the pool and make a profit. It's like a quick loan to play with, but the terms need to be strict to prevent misuse.

### Issue Overview:
> Our marketplace had a loophole. The contract, when buying, accepted an extra amount as a fee, creating an opening for a flashloan attack. An attacker could use a flashloan to manipulate pool liquidity, making an unexpected profit.

### Proof of Concept:
> Using Foundry, we simulated a test to showcase the vulnerability.

solidity
```
// Simulated flashloan attack
function testSkim() public {
    // Simulate flashloan and decrease the token amount in the pair
    uint256 flashloanFund = 100000 ether;
    // Flashloan attacker swaps ETH for tokens, decreasing the token amount in the pair
    // Repeatedly calls skim and sync to decrease liquidity
    // Results in a noticeable profit for the attacker
}
```
### Recommendation and Updates:
> To fix this, imagine the contract as a cautious banker. The Ice Team should avoid taking extra tokens from the sender to eliminate this flashloan vulnerability. Here's a simplified version of how this can be achieved:

solidity
```
// Recommended modification to avoid flashloan vulnerability
function buyTokens(uint256 amount) external {
    // Deduct fee directly from the transfer amount
    uint256 fee = calculateFee(amount);
    // Ensure sender has sufficient balance (amount + fee)
    require(balanceOf(msg.sender) >= amount + fee, "Insufficient balance");
    // Proceed with the token transfer, deducting the fee
    _transfer(msg.sender, address(this), amount + fee);
    // Process the fee or utilize it as needed
    processFee(fee);
    // Rest of the token buying logic
}
```
### Alleviation:
> Recognizing the urgency of tightening security, the Ice Team acted swiftly. In the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a), they removed the relevant codes, closing the door to potential flashloan attacks.

#
## ICE-18
### Audit Finding 7: Missing Input Validation in setUniswapV2LiquidityPool - Resolved
- Category: Volatile Code
- Severity: Medium
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 373~394
- Status: Resolved

### Understanding Input Validation:
> Input validation is like checking the ID of someone entering a secure building to ensure only legitimate individuals are allowed. It prevents unwanted guests (malicious inputs) from causing harm.

### Issue Overview:
> Our code was lacking proper checks in the setUniswapV2LiquidityPool function. It failed to validate critical inputs, such as checking if pairAddress already existed in uniswapV2LiquidityPools and verifying that routerAddress wasn't a zero address. This vulnerability allowed potential exploitation in setting liquidity/operation fees.

### Recommendation and Updates:
> To rectify this, we recommended robust input validation checks and the introduction of an upper limit on fees to keep them reasonable and within acceptable bounds.

solidity
```
// Recommended modification for input validation
function setUniswapV2LiquidityPool(address routerAddress, address pairAddress, bool isUni, bool isSushi, uint256 bLiqF, uint256 bOpF, uint256 sLiqF, uint256 sOpF) external {
    require(pairAddress != address(0), "Pair address cannot be zero");
    require(routerAddress != address(0), "Router address cannot be zero");
    require(!uniswapV2LiquidityPools[pairAddress], "Pair already exists in uniswapV2LiquidityPools");
    // Additional checks and validations
    // ...
}
```
### Alleviation:
The Ice Team promptly addressed this. In the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a), they resolved the issue by removing relevant codes, eliminating unnecessary risks.


#
## CET-01
### Audit finding 8: botsCaught WILL ALWAYS BE ZERO - Resolved

- Category: Logical Issue
- Severity: Minor
- Location: ICEToken.sol (c05e5c-01/08): 21, 450~453
- Status: Resolved

### Understanding Logical Issues:
> Logical issues are akin to a miscommunication that results in an unintended consequence. It's like telling someone the wrong time, leading to confusion.

### Issue Overview:
> The state variable botsCaught is utilized to record caught bots with a default value of zero. However, in the function _transfer(), if a bot is caught, the function raises a NoBots error, preventing the proper updating of botsCaught. Consequently, botsCaught remains zero indefinitely.

solidity
```
function _transfer(address from, address to, uint256 amount) internal {
    //...
    if (bots[from] || bots[to]) {
        botsCaught++;
        revert NoBots();
    }
    //...
}
```

### Recommendation and Updates:
> To address this, we recommended revisiting the function _transfer() and ensuring that botsCaught is updated appropriately.

### Alleviation:
The Ice Team promptly resolved this issue in the updated version (commit hash: f12108d0f765218d9167cfc2d6c3ba4c60b3a365) by removing relevant codes, ensuring a more accurate reflection of caught bots.



#
## ICE-06
### Audit Finding 9: MISSING CHECK INPUT AMOUNT - Resolved

- Category: Logical Issue
- Severity: Minor
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 622, 643
- Status: Resolved

### Understanding Input Amount Check:
> Imagine a toll booth that doesn't check whether the car approaching has a valid toll amount before opening the gate. The missing check for input amount in the code is akin to allowing cars without proper toll payments, leading to unforeseen consequences.

### Issue Overview:
> The code overlooked a crucial validation step in the _swapTokensForEth() and _addLiquidity() functions. It failed to check whether the amount variable was greater than zero before executing significant operations. Without this check, transactions could fail, causing disruptions due to insufficient input amount validation.

### Recommendation and Updates:
> To address this vulnerability, the recommendation involved implementing a simple yet impactful check to ensure that the input amount is greater than zero. This preventative measure enhances the reliability and stability of transactions involving these critical functions.

solidity
```
// Recommended modification for input amount check
function _swapTokensForEth(uint256 amount) internal {
    require(amount > 0, "Amount must be greater than zero");
    // Existing code...
}

function _addLiquidity(uint256 amount) internal {
    require(amount > 0, "Amount must be greater than zero");
    // Existing code...
```

### Alleviation:
> The Ice Team took prompt action to resolve this issue in the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a) by removing relevant codes. This ensures that transactions are conducted with enhanced robustness, mitigating potential problems associated with unchecked input amounts.

#
## ICE-07
### Audit Finding 10: POTENTIAL SANDWICH ATTACKS - Resolved

- Category: Logical Issue
- Severity: Minor
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 622, 643
- Status: Resolved

### Understanding Sandwich Attacks:
> Consider a cafeteria where a crafty customer observes others placing orders and decides to manipulate the menu prices for personal gain. The potential sandwich attack in the code is analogous to this situation, where an attacker exploits transactions involving token swaps or liquidity additions without imposing restrictions, thus impacting exchange rates.

### Issue Overview:
> Certain functions, notably swapExactTokensForETHSupportingFeeOnTransferTokens() and addLiquidityETH(), were susceptible to sandwich attacks. The absence of restrictions on slippage or minimum output amounts left transactions vulnerable, particularly when dealing with substantial input amounts. This flaw allowed attackers to manipulate exchange rates and profit from the price differentials caused by front-running and back-running transactions.

### Recommendation and Updates:
> To mitigate the risk of sandwich attacks, the recommendation was to introduce reasonable minimum output amounts, based on token prices, when invoking the identified functions. This proactive measure provides a level of protection against potential manipulations and enhances the overall security of transactions.

solidity
```
// Recommended modification for setting reasonable minimum output amounts
function swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external {
    require(amountOutMin > 0, "Minimum output amount must be greater than zero");
    // Existing code...
}

function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external payable {
    require(amountTokenMin > 0 && amountETHMin > 0, "Minimum output amounts must be greater than zero");
    // Existing code...
}
```
### Alleviation:
> The Ice Team swiftly addressed this issue in the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a) by removing relevant codes. This proactive resolution eliminates the vulnerability to sandwich attacks and reinforces the security of transactions involving these functions.


#
## ICE-08
### Audit Finding 11: UNCHECKED VALUE FROM LOW-LEVEL CALL - Resolved

- Category: Volatile Code
- Severity: Minor
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 350, 710
- Status: Resolved

### Understanding Unchecked Value from Low-Level Call:
> Imagine making a phone call and assuming the information received is accurate without verifying it. Similarly, the code was neglecting to verify the return value of low-level calls, potentially leading to unintended consequences.

### Issue Overview:
> The code snippet presented instances where the return values of low-level calls were ignored. Specifically, in the lines:

solidity
```
(success,) = address(operationsAddress).call{value: address(this).balance}("");
(success,) = address(msg.sender).call{value: address(this).balance}("");
```

### The success status of these calls was not checked, which could result in undetected failures and pose a risk to the robustness of the functionality.

### Recommendation and Updates:
> To address this, it was recommended to incorporate checks for the return value when utilizing low-level call methods. This ensures that potential failures are identified and handled appropriately.

solidity
```
// Recommended modification for checking return value
(bool success,) = address(operationsAddress).call{value: address(this).balance}("");
require(success, "Low-level call to operationsAddress failed");

(bool success,) = address(msg.sender).call{value: address(this).balance}("");
require(success, "Low-level call to msg.sender failed");
```

### Alleviation:
> The Ice Team promptly resolved this issue in the updated version (commit hash: acb5dbb00eab45c41126279c7997acf33a5af0e1) by incorporating checks for the return values of the low-level calls. This proactive approach enhances the reliability of the code by ensuring that potential failures are acknowledged and appropriately addressed.

#
## ICE-09
### Audit Finding 12: UNCHECKED VALUE OF ERC-20 transfer() /transferFrom() CALL - Resolved

- Category: Volatile Code
- Severity: Minor
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 343
- Status: Resolved

### Understanding Unchecked Value of ERC-20 transfer() / transferFrom() Call:
> Consider sending a package without confirming if it reached the destination. Similarly, the code was not checking the return value of the ERC-20 transfer() call, potentially leading to undetected issues.

### Issue Overview:
> The specific concern was the unchecked return value of the linked transfer() invocation in the code. This could result in overlooking potential failures in the ERC-20 token transfer operation, especially when dealing with tokens that deviate from the standard.

### Recommendation and Updates:
> To mitigate this risk, it was recommended to utilize OpenZeppelin's SafeERC20.sol implementation when interacting with the transfer() and transferFrom() functions of ERC-20 tokens. This implementation optionally checks for a return value, making it compatible with a broader range of ERC-20 token implementations.

solidity
```
// Recommended modification using SafeERC20.sol
IERC20(tokenAddress).safeTransfer(to, amount);
```

### Alleviation:
> The Ice Team proactively resolved this issue in the updated version (commit hash: acb5dbb00eab45c41126279c7997acf33a5af0e1) by adopting OpenZeppelin's SafeERC20.sol implementation. This approach enhances compatibility and robustness when interacting with various ERC-20 tokens, ensuring that potential issues related to unchecked return values are addressed.


#
## ICE-11
### Audit Finding 13: UNUSED RETURN VALUE - Resolved

- Category: Volatile Code
- Severity: Minor
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 651~658
- Status: Resolved

### Understanding Unused Return Value:
> Imagine making a call and not paying attention to the response. In the smart contract, not checking or storing the return value of an external call can introduce vulnerabilities due to unhandled outcomes.

### Issue Overview:
> The specific concern was the lack of checking or storing the return value of an external call in the code. In the context of the addLiquidityETH function call on the IDEXRouter, not handling the return value might lead to overlooking critical information related to the liquidity addition.

### Recommendation and Updates:
> To ensure proper error handling and avoid potential vulnerabilities, it was recommended to check or use the return values of all external function calls. These values should be stored in appropriate local or state variables if necessary.

solidity
```
// Recommended modification for proper error handling
(bool success, ) = IDEXRouter(receiver.router).addLiquidityETH{value: ethAmount}(
    address(this),
    tokenAmount,
    0, // slippage is unavoidable
    0, // slippage is unavoidable
    address(0xdead),
    block.timestamp
);

// Check the success variable and handle accordingly
if (!success) {
    // Handle the error
}
```

### Alleviation:
> The Ice Team proactively resolved this issue in the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a) by removing the relevant codes. While removing the codes might not directly address the unused return value, it eliminates the associated risk and simplifies the logic to enhance code readability and maintainability.

#
## ICE-17
### Audit Finding 14: ICE TOKEN SHOULD BE EXCLUDED FROM transferForeignToken() - Resolved

- Category: Inconsistency
- Severity: Minor
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 340~345
- Status: Resolved

### Understanding Inconsistency:
> It's like saying, "I'll accept any foreign currency except my own." Inconsistency arises when the function transferForeignToken() allows the owner to transfer any ERC20 token, including the 'ICE' token, contrary to its intended purpose.

### Issue Overview:
> The transferForeignToken() function, designed to facilitate the transfer of foreign tokens, lacked the specific check to exclude the 'ICE' token. This inconsistency could potentially allow the owner to transfer 'ICE' tokens as well, contradicting the function's purpose.

### Recommendation and Updates:
> To align with the function's name and purpose, it was recommended to exclude the 'ICE' token from the transferForeignToken() function. This ensures that the function only facilitates the transfer of tokens other than the native 'ICE' token.

solidity
```
// Recommended modification to exclude 'ICE' token
function transferForeignToken(address _token, address _to) external onlyOwner returns (bool _sent) {
    require(_token != address(0), "_token address cannot be 0");
    
    // Additional check to exclude 'ICE' token
    require(keccak256(abi.encodePacked(_token)) != keccak256(abi.encodePacked("ICE")), "Cannot transfer 'ICE' tokens");

    uint256 _contractBalance = IERC20(_token).balanceOf(address(this));
    _sent = IERC20(_token).transfer(_to, _contractBalance);
    emit TransferForeignToken(_token, _contractBalance);
}
```


### Alleviation:
> The Ice Team efficiently addressed this inconsistency in the updated version (commit hash: acb5dbb00eab45c41126279c7997acf33a5af0e1). By incorporating the recommended check, they ensured that the 'ICE' token is excluded from the transferForeignToken() function, bringing it in line with its intended functionality.



#
## ICE-13
### Audit Finding 15: FREQUENT CALL TO _swapBack() - Resolved

- Category: Design Issue
- Severity: Informational
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 568~578
- Status: Resolved

### Understanding Design Issue:
> Imagine going to the ATM, and it dispenses cash every time you check your balance. It's unnecessary and may lead to inefficiencies. A design issue occurs when the contract calls _swapBack() too frequently, especially when the token amount is negligible.

### Issue Overview:
> The contract's continuous invocation of _swapBack() during every normal transfer and sell transaction was deemed excessive, particularly when dealing with minuscule token amounts. This could result in unnecessary gas costs and potential inefficiencies.

### Recommendation and Updates:
> To optimize the contract's behavior, it was recommended to introduce a threshold, preventing the frequent invocation of _swapBack() and saving resources. The initial default value of _swapBackThreshold was considered too small, and adjusting it to a more reasonable range was advised.

solidity
```
// Recommended modification to set a reasonable threshold
function setSwapBackThreshold(uint256 threshold) external onlyOwner {
    // Additional check to ensure the threshold is within a reasonable range
    require(threshold > 0 && threshold <= MAX_REASONABLE_THRESHOLD, "Invalid threshold value");

    _swapBackThreshold = threshold;
}
```

### Alleviation:
> The Ice Team initially addressed this by partially resolving the issue in the updated version (commit hash: acb5dbb00eab45c41126279c7997acf33a5af0e1). However, it was noted by CertiK that the default value of _swapBackThreshold was still considered too small. In the subsequent resolution (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a), the Ice Team fully resolved the issue by removing relevant codes, eliminating the need for the threshold altogether. This optimization ensures that _swapBack() is called judiciously, enhancing the contract's efficiency.


#
## ICE-01
### Audit Finding 16: REDUNDANT CODE - Resolved

- Category: Gas Optimization
- Severity: Optimization
- Location: ICEToken.sol (0da0758f37426cd387e2f6771da29dd3f1e68373): 171
- Status: Resolved

### Understanding Gas Optimization:
> Gas optimization is crucial in smart contracts to efficiently use computational resources on the blockchain, minimizing transaction costs and enhancing overall contract performance. Gas is the unit that measures the computational effort required to execute operations or transactions.

### Issue Overview:
> The identified issue relates to redundant code in the smart contract. Specifically, the contract contains a call to transferOwnership(operationsAddress), but this call is redundant because operationsAddress has already been set as msg.sender in the preceding statement.

solidity
```
constructor() ERC20("ICE", "ICE") Ownable(msg.sender) {
    operationsAddress = msg.sender;
    // Redundant statement
    transferOwnership(operationsAddress);
    // ...
}
```

> In the constructor function, the contract is being set up. It inherits from Ownable, and the Ownable constructor is called with msg.sender as an argument. This effectively sets the contract owner (owner in Ownable context) to be the account that deployed the contract. Subsequently, operationsAddress is set to the same address (msg.sender).

Now, the redundant part is the call to transferOwnership(operationsAddress). In the context of the Ownable contract, the transferOwnership function is designed to transfer ownership to a new address. However, since operationsAddress is already set as the owner during contract deployment, calling transferOwnership with the same address (operationsAddress) is unnecessary and redundant.

### Recommendation and Updates:
> The recommendation is to remove the redundant call to transferOwnership(operationsAddress):

solidity
```
constructor() ERC20("ICE", "ICE") Ownable(msg.sender) {
    operationsAddress = msg.sender;
    // Redundant statement removed
    // transferOwnership(operationsAddress);
    // ...
}
```

### Alleviation:
> The removal of this redundant statement optimizes gas usage by eliminating unnecessary computations. The contract still maintains the intended ownership structure without incurring additional gas costs associated with redundant function calls.

#
## ICT-01
### Audit Finding 17: MISSING BREAK IN LOOP - Resolved

- Category: Logical Issue
- Severity: Optimization
- Location: ICEToken.sol (acb5db-12/13): 735~739
- Status: Resolved

### Understanding Logical Issue - Optimization:
> Logical issues that fall under the optimization category are related to enhancing the efficiency of code execution, often by reducing gas consumption. Optimization focuses on streamlining operations without compromising functionality.

### Issue Overview:
> The identified issue involves a loop that iterates through uniswapV2LiquidityPools. If msg.sender is found as a router, the loop continues to iterate despite the fact that the desired condition has been met. This results in unnecessary gas consumption. The absence of a break statement prevents the loop from terminating early once the condition is satisfied.

solidity
```
for (uint i = 0; i < uniswapV2LiquidityPools.length; i++) {
    if (uniswapV2LiquidityPoolSlots[uniswapV2LiquidityPools[i]].router == msg.sender) {
        interactingToRouter = true;
    }
}
```

### Recommendation and Updates:
> To optimize gas usage, we recommended adding a break statement inside the loop to exit early when the desired condition is met.

solidity
```
for (uint i = 0; i < uniswapV2LiquidityPools.length; i++) {
    if (uniswapV2LiquidityPoolSlots[uniswapV2LiquidityPools[i]].router == msg.sender) {
        interactingToRouter = true;
        // Add break to exit the loop
        break;
    }
}
```

### Alleviation:
> The Ice Team resolved this issue in the updated version (commit hash: c05e5ca785a5d4e2c36eb7bb74f881be952f243a) by removing the relevant codes. While this solution achieves the desired optimization, it is important to note that the loop itself is removed, likely as part of a broader code modification. This comprehensive change addresses the gas optimization concern by eliminating unnecessary iterations.








> ##### Readme Created by `Enebeli Emmanuel` for Ice Audit 1



