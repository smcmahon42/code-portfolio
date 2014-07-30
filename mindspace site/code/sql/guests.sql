SET FOREIGN_KEY_CHECKS=0;
CREATE TABLE guests (
    guest_id int(11) NOT NULL auto_increment,
    username varchar(100) default NULL,
    password varchar(100) default NULL,
    points int(11) default 0,
    tasks text default null,
    PRIMARY KEY  (guest_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
