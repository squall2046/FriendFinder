drop database if exists  friendfinder_db;

create database friendfinder_db;
use friendfinder_db;

create table friends (
id int primary key auto_increment not null,
name varchar (50),
photo varchar (255),
scores varchar (50)
)

