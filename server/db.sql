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
    name_image1 varchar(100),
    extra_image2 varchar(100),
    extra_image3 varchar(100),
    extra_image4 varchar(100),
    video_name varchar(100),
    course_name varchar(50),
    trainer_name varchar(50),
    course_description varchar(5000),
    weekdays varchar(50),
    weekends varchar(50),
    weekday_duration varchar(50),
    weekend_duration varchar(50),
    place varchar(100),
    available_seats int,
    price_month float,    
    price_year float
);

create table user_courses (
    id_usercourse serial primary key,
    id_user int,
    id_course int,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade,
    foreign key (id_course) references courses(id_course)
        on delete restrict on update cascade
);

create table stories (
    id_story serial primary key,
    author varchar(50),
    title varchar(255),
    story varchar(3000),
    blog_date date,
    image_name varchar(50)
);

create table comments (
    id_response serial primary key,
    id_story int,  
    id_user int,   
    content varchar(200),
    date_added date,
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
        on delete restrict on update cascade
);

create table cart (
    id_cart serial primary key,
    id_user int,
    id_course int,
    foreign key (id_user) references users(id_user)
        on delete restrict on update cascade,
    foreign key (id_course) references courses(id_course)
        on delete restrict on update cascade
);

insert into users (
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
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Yoga1.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Yoga.mp4',
        'Body Balance',
        'John Doe',
        'This body balance yoga course is designed to improve stability and coordination through a series of postures and movements. The classes focus on building strength in the core, legs, and feet, while also incorporating mindfulness techniques to enhance body awareness and control. Students of all levels can benefit from this course, which offers a supportive and energizing environment for developing greater balance and harmony within the body.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Body Step.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Body Step.mp4',
        'Body Step',
        'Emily Parker',
        'Body step exercise is a cardio-based workout that uses basic stepping movements to improve fitness and stamina. It involves a series of choreographed routines set to music, which makes the workout fun and engaging.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Body attack.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Body attack.mp4',
        'Body Attack',
        'Sophia Lee',
        'Body attack is a high-energy, sports-inspired group fitness class that combines aerobic and plyometric movements with strength and stabilization exercises. Designed to improve cardiovascular fitness, agility, and overall physical endurance, Body attack provides a challenging workout suitable for individuals of all fitness levels.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );


insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Aerobic.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Aerobic.mp4',
        'Aerobic',
        'Samuel Kim',
        'Aerobic exercise classes involve continuous and rhythmic movements that increase the heart rate and improve cardiovascular endurance. These classes can be high-impact or low-impact, and may include a variety of exercises such as dance, step aerobics, kickboxing, and cycling, making them a fun and effective way to burn calories and improve overall fitness.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Core.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Core.mp4',
        'Core',
        'Chloe Davis',
        'Core exercise classes focus on strengthening and toning the muscles in the abdomen, back, and pelvis. These classes often include exercises such as planks, crunches, and bridges, and can be tailored to challenge individuals of all fitness levels, helping to improve posture, stability, and overall core strength.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Body building.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Body building.mp4',
        'Body Building',
        'Olivia Ramirez',
        'Bodybuilding exercise classes are designed to help individuals build muscle and increase strength through weightlifting and resistance training. These classes often focus on specific muscle groups and may include exercises such as squats, deadlifts, and bench presses, making them an effective way to sculpt and tone the body while improving overall fitness.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Crossfit.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Crossfit.mp4',
        'Crossfit',
        'OBenjamin Ortiz',
        'CrossFit exercise classes combine high-intensity interval training, weightlifting, and gymnastics to create a challenging and diverse workout that targets all aspects of fitness. These classes often involve a combination of functional movements performed at a high intensity, making them a great way to improve strength, endurance, and overall fitness.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        70.00,
        500.00
        );

insert into courses (
    name_image1,
    extra_image2,
    extra_image3,
    extra_image4,
    video_name,
    course_name,
    trainer_name,
    course_description,
    weekdays,
    weekends,
    weekday_duration,
    weekend_duration,
    place,
    available_seats,
    price_month,    
    price_year
    )
    values (
        'Barre.jpg',
        'Yoga2.jpg',
        'Yoga3.jpg',
        'Yoga4.jpg',
        'Barre.mp4',
        'Barre',
        'Brandon Collins',
        'Barre exercise classes are inspired by ballet and incorporate elements of dance, Pilates, and yoga to create a low-impact, full-body workout. These classes focus on small, isometric movements that target the muscles in the legs, core, and arms, while also improving flexibility, balance, and posture, making them a great choice for individuals of all fitness levels.',
        'Monday-Friday',
        'Saturday-Sunday',
        '17.00-19.00',
        '9.00-11.00',
        'Studio Fitness Club, Pentti katu 1, 90570 Oulu',
        10,
        60.00,
        500.00
        );

    insert into cart(
        id_user,
        id_course
    ) values (
        1,
        3
    );

    insert into cart(
        id_user,
        id_course
    ) values (
        1,
        5
    );