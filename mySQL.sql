CREATE DATABASE tongue_node;

USE toungue_node;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    age INT NOT NULL,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) not null,

    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    type ENUM('like', 'comment') NOT NULL,
    content VARCHAR(500) null,
    
    -- Remember to update the table
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_interaction_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_interaction_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

INSERT INTO users (nickname, age, city) VALUES 
('Arnold', 78, 'Thal'),          
('WriterOnly', 30, 'Berlin'),   
('LikerOnly', 22, 'Paris'),     
('PowerUser', 28, 'Madrid'),     
('SocialStar', 35, 'Amsterdam'),  
('CasualDave', 40, 'London'),     
('GhostReader', 19, 'Stockholm'),  
('TheLoner', 25, 'Rome'),
('Jackie Chan', 70, 'Hong Kong'),
('Chris Bumstead', 30, 'Canada');

-- Le API dovranno consentire l’inserimento, la modifica e la cancellazione
-- di un post con una caratteristica: un titolo, data di inserimento.

INSERT INTO posts (user_id, title, published_at) VALUES 
(1, 'I will be back', '2026-03-24 08:00:00'),   
(2, 'Berlin Nightlife', '2026-03-01 10:00:00'),    
(4, 'Tapas Tour', '2026-03-10 08:30:00'),          
(4, 'Tech in Spain', '2026-03-20 15:00:00'),      
(5, 'Canals of Amsterdam', '2026-03-22 12:00:00'),        
(6, 'London Fog', '2026-03-23 09:00:00');