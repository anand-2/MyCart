create  table product(
	product_id  SERIAL primary key ,
	name varchar(100)  unique not null,
	description text   not null ,
	image text  not null,
	price int not null,
	created_by int not null,
	created_on timestamp not null
);

create table "user"(
	user_id  serial primary key ,
	username varchar(30) unique not null 
);

create  table cart_user(
	cart_id serial primary key ,
	user_id bigint  references "user"(user_id) 
	
);

create  table  cart(
	cart_id serial  references cart_user(cart_id),
	product_id bigint references  product(product_id),
	quantity int not null ,
	created_on timestamp not null ,
	created_by int not null 
	
);

