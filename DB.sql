--FOOD CATEGORY TABLE----
create table food_cat(fid serial,category varchar(50))

select *from food_cat

insert into food_cat(category) values('VEG')
insert into food_cat(category) values('NONVEG')
insert into food_cat(category) values('chineese')
insert into food_cat(category) values('JAIN')


update food_cat set category='ceeze' where fid='4'
delete from food_cat where fid=4

---QTY MAST TABLE----

CREATE table qty_mast(qid serial,size varchar(30))
select *from qty_mast;

insert into qty_mast(size) values('FULL');
insert into qty_mast(size) values('1/2');
insert into qty_mast(size) values('1/4');
insert into qty_mast(size) values('1/8');

select * from qty_mast;

---Menu----

create table menu(mid serial ,mname varchar(50),price int, fid int, qid int)
select * from menu
insert into menu(mname,price,fId,qid) values('PANEER',275,1,1);
insert into menu(mname,price,fId,qid) values('CHIKEN',275,2,2);
insert into menu(mname,price,fId,qid) values('MUTTON',500,3,3);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    uname VARCHAR(50) UNIQUE NOT NULL,
    pwd VARCHAR(255) NOT NULL
);

INSERT INTO admin (uname, pwd) VALUES ('admin', 'admin123');

select* from admin;

