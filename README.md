# 2018-SNUHACK-AUTUMN
DELL PPO website 
DOCUMENTATION

Problem Statement: Improve Efficiency of Reconciliation.

What this means is to ensure that the data communicated between two enterprises

is not corrupted and that there are no inconsistencies in the data held by both

the enterprises.

Implementation:

1\. A client side webapp to facilitate the process of placing

   orders. 

2\. Another webapp for the warehouses'(slaves) inventory and enterprise

   side admin(Master) in order to keep track of the inventory and the pending

   orders.

3\. Backend implementation is done using Blockchain technology to ensure

   immutability.

4\. The use of a relatively new concept of DPOS which involves working

   on a side chain as a branch to the main chain in order to decrease the 

   processing time.

5\. The data maintained by both webapps should not have any variation and 

   should be consistent during all stages and this is achieved by using 

   blockchain to communicate.

Technologies used: 

1\. MongoDB

2\. BlockChain(Web 3js, Solidity, Truffle framework)

3\. Python

4\. JavaScript

5\. HTML, CSS, BootStrap

Key Functions: 

1\. Place order(ensure that order details are not lost, mutated)

2\. Dashboard displays pending orders, stats, previous transactions.

3\. Blockchain ensures that the data communicated between the two webapps

   is not lost/modified.

4\. Inventory of laptops also maintained by the dashboard(add products).

5\. Additional export to .csv file feature also available.

Program Structure:

Client selects a product to buy->Places an order(client also selects the warehouse)

->Order goes to the Warehouse->If the conditions are satisfied then the tokens are transferred

->all communication between the webapps is reliable(through blockchain)

Problems encountered:

1\. Minting unique tokens for each product(each laptop model)

2\. Adding images to IPFS and using Browserify.

3\. Time constraint prohibited the implementation of ElasticSearch.
