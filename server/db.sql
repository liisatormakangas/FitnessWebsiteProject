drop database if exists FitnessWebSite;
create database FitnessWebSite;
use FitnessWebSite;

create table users (
    id_user serial primary key,
    firstname varchar(50),
    lastname varchar(50),
    email varchar(50),
    username varchar(50),
    passwd varchar(255),
    street_address varchar(50),
    postal_code char(5),
    city varchar(50),
    phone_number varchar(50)
);

create table courses (
    id_course serial primary key,
    course_name varchar(50),
    course_type varchar(50),
    trainer_name varchar(50),
    price float,
    duration varchar(25),
    weekdays varchar(50),
    place varchar(50),
);

create table user_courses (
    id_usercourse serial primary key,
    id_user int,
    id_course int,
    foreign key (id_user) references user(id_user)
        on delete restrict on update cascade,
    foreign key (id_course) references courses(id_course)
        on delete restrict on update cascade
);

create table stories (
    id_story serial primary key,
    author varchar(50),
    title varchar(255),
    story varchar(3000),
    blog_date date
);

create table comments (
    id_response serial primary key,
    id_story int,  
    id_user int,   
    content varchar(200),
    whenadded date,
    foreign key (id_story) references stories(id_story)
        on delete restrict on update cascade,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade
);

create table user_reaction (
    id_reaction serial primary key,
    id_story int,
    id_user int,
    likes boolean,
    foreign key (id_story) references stories(id_story)
        on delete restrict on update cascade,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade,
);

insert into user (
	firstname,
	lastname,
	email,
	username,
	passwd,
	street_address,
	postal_code,
	city,
	phone_number
    )
	values (
		'John',
		'Doe',
		'johndoe@email.com',
		'johnny',
		'somehashpwd',
		'Street 1',
		'00100',
		'Bigcity',
		'+358 50 123456'
	);


insert into stories (
    author,
    title,
    story,
    blog_date)
	values (
        '@John',
        'Five Exercises for Stronger Triceps',
        null,
        '2023-03-27'
        );
	
update stories set story=' ' where id_story = 1;

insert into courses (
    course_name,
    course_type,
    trainer_name,
    price,
    duration,
    weekdays,
    place
    )
    values (
        'Body Balance',
        'Group',
        'John Brown',
        60.00,
        '17.00-18.00',
        'Monday-Friday',
        'Stadio Fitness Club'
        );




