USE SpringBootSecurityConcepts;
desc customer;
Insert INTO customer(customer_contact_number,customer_email_address,customer_full_name,customer_password,customer_role) values
("9149396562","kirtishekhar1997@gmail.com","Kirti Shekhar Pandey","Kirti@31",'ROLE_USER'),
("9971302487","mihircool@gmail.com","Mihir Pandey","$2y$12$oRRbkNfwuR8ug4MlzH5FOeui.//1mkd.RsOAJMbykTSupVy.x/vb2",'ROLE_ADMIN');
INSERT INTO  Authority(customer_id,authorities_name) values (1, 'ROLE_USER'),(2,'ROLE_ADMIN');
SELECT 
    *
FROM
    customer;
SELECT 
    *
FROM
    authority;
SHOW tables;
SELECT 
    *
FROM
    cards;
desc notice;
SELECT 
    *
FROM
    notice;
desc loans;
desc accounts;
desc account_transactions;
desc contact;
SHOW tables;

INSERT INTO contact(contact_email,contact_name,create_dt,message,subject) VALUES
("kirtishekhar1997@gmail.com","Kirti Shekhar Pandey",CURDATE()-6,"take necessary action to allocate new project","Regarding Project Allocation"),
("mihircool@gmail.com","Mihir Pandey",CURDATE()-3,"want to know more about haskel course","Regarding course query");

INSERT INTO account_transactions(account_number,customer_id,transaction_dt,transaction_summary,transaction_type,
transaction_amt,closing_balance,create_dt)  VALUES (186576453434, 1, CURDATE()-7, 
'Coffee Shop', 'Withdrawal', 30,34500,CONVERT(CURDATE()-7,DATE)),(186576453434, 1,CONVERT(CURDATE()-6,DATE), 'Uber', 'Withdrawal', 
100,34400,CONVERT(CURDATE()-6,DATE)),(186576453434, 1, CURDATE()-5, 'Self Deposit', 'Deposit',
500,34900,CONVERT(CURDATE()-5,DATE)),(186576453434, 1, CURDATE()-4, 'Ebay', 'Withdrawal',
600,34300,CONVERT(CURDATE()-4,DATE)),(186576453434, 1, CURDATE()-2, 'OnlineTransfer', 'Deposit',
700,35000,CONVERT(CURDATE()-2,DATE)),(186576453434, 1, CURDATE()-1, 'Amazon.com', 'Withdrawal',100,34900,CURDATE()-1);

INSERT INTO accounts (customer_id,account_type, branch_address, create_dt)
 VALUES (1,'Savings', '123 Main Street, New York', CURDATE());

INSERT INTO loans (customer_id,start_dt,loan_type,total_loan,amount_paid,outstanding_amount,create_dt)
 VALUES ( 1,'2020-06-06', 'Vehicle', 40000, 10000, 30000, '2020-06-06'),( 1,
 '2018-02-14', 'Home', 50000, 10000, 40000, '2018-02-14'),( 1,'2018-02-14',
 'Personal', 10000, 3500, 6500, '2018-02-14'),( 1, '2020-10-13', 'Home', 200000, 50000, 150000, CURDATE());

INSERT INTO cards (card_number,customer_id,card_type,total_limit,amount_used,available_amount,create_dt)
 VALUES ('4565XXXX4656', 1, 'Credit', 10000, 500, 9500, CURDATE()),
 ('3455XXXX8673', 2, 'Credit', 7500, 600, 6900, CURDATE()),
 ('2359XXXX9346', 1, 'Credit', 20000, 4000, 16000, CURDATE());
 
INSERT INTO notice (notice_summary,notice_details,notice_beg_dt,notice_end_dt,create_dt,update_dt)
VALUES ('E Auction notice', 'There will be a e-auction on 12/08/2020 on the Bank website for all the stubborn arrears.Interested parties can participate in the e-auction', 
'2020-10-14', '2020-12-08', CURDATE(), null), ('Launch of Millennia Cards', 'Millennia Credit Cards are launched for the premium customers of EazyBank. With these cards, you will get 5% cashback for each purchase', 
'2020-10-14', '2020-11-28', CURDATE(), null), ('COVID-19 Insurance', 'EazyBank launched an insurance policy which will cover COVID-19 expenses. Please reach out to the branch for more details', 
'2020-10-14', '2020-12-31', CURDATE(), null),('Mobile App Downtime', 'The mobile application of the EazyBank will be down from 2AM-5AM on 12/05/2020 due to maintenance activities', 
'2020-10-14', '2020-12-01', CURDATE(), null),('Net Banking Offers', 'Customers who will opt for Internet banking while opening a saving account will get a $50 amazon voucher', 
'2020-10-14', '2020-12-05', CURDATE(), null),('Home Loan Interest rates reduced', 'Home loan interest rates are reduced as per the goverment guidelines. The updated rates will be effective immediately', 
'2020-10-14', '2020-11-30', CURDATE(), null);

update loans set customer_id = 2 where loan_number = 3;

SHOW tables;
SELECT 
    *
FROM
    customer;
SELECT 
    *
FROM
    authority;
SELECT 
    *
FROM
    cards;
SELECT 
    *
FROM
    notice;
SELECT 
    *
FROM
    loans;
SELECT 
    *
FROM
    contact;
SELECT 
    *
FROM
    accounts;
SELECT 
    *
FROM
    account_transactions;
    
desc notice;
update notice set notice_beg_dt = "2022-08-12",notice_end_dt = "2022-09-03" WHERE notice_id = 1;
update notice set notice_beg_dt = "2022-08-12",notice_end_dt = "2022-09-03" WHERE notice_id = 3;
update notice set notice_beg_dt = "2022-08-12",notice_end_dt = "2022-09-03" WHERE notice_id = 5;
SELECT * from notice where curdate() between notice_beg_dt and notice_end_dt;