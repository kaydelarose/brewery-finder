USE sys;

# ---------------------------------------------------------------------- #
# Target DBMS:           MySQL                                           #
# Project name:          Brewery Finder                                  #
# ---------------------------------------------------------------------- #
DROP DATABASE IF EXISTS breweries;

CREATE DATABASE IF NOT EXISTS breweries;

USE breweries;

# ---------------------------------------------------------------------- #
# Tables                                                                 #
# ---------------------------------------------------------------------- #

CREATE TABLE Users (
                       user_id INT NOT NULL AUTO_INCREMENT,
                       username VARCHAR(50) NOT NULL,
                       hashed_password VARCHAR(255) NOT NULL,
                       user_role VARCHAR(50) NOT NULL,
                       PRIMARY KEY (user_id)
);

CREATE TABLE Brewer (
    brewer_id INT NOT NULL AUTO_INCREMENT,
    breweries_owned INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    PRIMARY KEY (brewer_id)
    );

CREATE TABLE Customer (
    customer_id INT NOT NULL AUTO_INCREMENT,
    favorite_breweries TEXT,
    total_reviews INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    PRIMARY KEY (customer_id)
);

CREATE TABLE Brewery (
    brewery_id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    brewery_name VARCHAR(255),
    brewery_type VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    longitude DOUBLE,
    latitude DOUBLE,
    phone VARCHAR(15),
    website_url VARCHAR(255),
    brewer_id INT,
    FOREIGN KEY (brewer_id) REFERENCES Brewer(brewer_id),
    PRIMARY KEY (brewery_id)
);

CREATE TABLE CustomerFavorites (
    favorite_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    brewery_id VARCHAR(36),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (brewery_id) REFERENCES Brewery(brewery_id),
    PRIMARY KEY (favorite_id)
);

CREATE TABLE CustomerReviews (
    review_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    brewery_id VARCHAR(36),
    rating INT,
    customer_review TEXT,
    review_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (brewery_id) REFERENCES Brewery(brewery_id),
    PRIMARY KEY (review_id)
);

/*  INSERT Users  */
/* Users and Passwords
username	password
--------	--------
user		password
admin		password
gandalf		password
frodo		password
samwise		password
gollum		password


 are: password */
INSERT INTO Users (username, hashed_password, user_role)
VALUES  ('user','$2a$10$NkufUPF3V8dEPSZeo1fzHe9ScBu.LOay9S3N32M84yuUM2OJYEJ/.','ROLE_USER'),
('admin','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('gandalf','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('frodo','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_BREWER'),
('samwise','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_BREWER'),
('gollum','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('thorin', '$2a$10$JHQg13RccfC2He9Bz6a8m.5RYF5B0IdHmnEbt/gSuV8wWfxTUIFqG', 'ROLE_USER'),
('legolas', '$2a$10$E5cbsTKwDpU1RuHKuyOguu68Aqz8gn8c74N5sk6ZXs6QDLkq0IlhG', 'ROLE_USER'),
('arwen', '$2a$10$hp87ED0gZy2SgSKV5u3Y4OHRL1h2KpI5MRV8PeyBeHo8Rp8AHgRMK', 'ROLE_USER'),
('saruman', '$2a$10$8knm9ZtO1PgfXlGyFeR4LOA/gZnq6Jo2fs4i/EOQSc2MYxfQGo1m2', 'ROLE_ADMIN'),
('dumbledore', '$2a$10$DxN9U8WwaD1Lv6WppL4Oa.M8Rtj/SMRgVM4tXQZwSb7dYuEt4Jtk6', 'ROLE_ADMIN'),
('brewmaster', '$2a$10$2F8YhYwZgofOR0zA/lzISeQbDR1o6F3P7wiM8B.T6q4pckM61Kj0C', 'ROLE_BREWER'),
('barleycorn', '$2a$10$Nf7hlFEV9G4L5BWCSukD9OUtJxNe9VB1JpN8y0b3Bgs39h9RDd2m.', 'ROLE_BREWER'),
('hobbiton', '$2a$10$fuTwZsTfHSr0RrzKyHQddO8V4dIsQjx8zH2MSpTkSOE.EGttqjGsi', 'ROLE_USER'),
('rivendell', '$2a$10$GtQWyKEQp7DZ/xU0pAfKx.4U9Aa9Af68hRhH/6BSF3PrQQhx9Nqhm', 'ROLE_USER'),
('aragorn', '$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2', 'ROLE_BREWER'),
('boromir', '$2a$10$2F8YhYwZgofOR0zA/lzISeQbDR1o6F3P7wiM8B.T6q4pckM61Kj0C', 'ROLE_USER'),
('faramir', '$2a$10$8knm9ZtO1PgfXlGyFeR4LOA/gZnq6Jo2fs4i/EOQSc2MYxfQGo1m2', 'ROLE_USER'),
('eowyn', '$2a$10$fuTwZsTfHSr0RrzKyHQddO8V4dIsQjx8c74N5sk6ZXs6QDLkq0IlhG', 'ROLE_USER'),
('elrond', '$2a$10$GtQWyKEQp7DZ/xU0pAfKx.4U9Aa9Af68hRhH/6BSF3PrQQhx9Nqhm', 'ROLE_BREWER'),
('pippin', '$2a$10$LfQi9ZlJwLZ1kd3jZ6J9qF39IiwplWVOblhW2kYIuOFSQ1QdJNaaS', 'ROLE_USER'),
('merry', '$2a$10$lfQi9jsbJzfd4LmXlnu1uR8FaUvGRDBwjcR18YyDFStTDaLoG.Zz.', 'ROLE_USER'),
('denethor', '$2a$10$Igfd7LJKf91fg45L0fhZne/BZ9OXtcYudwlQgZFGcsIhnfB8k9PaK', 'ROLE_ADMIN'),
('glorfindel', '$2a$10$JhS9QJfXGgkXw1sj5LFcVOafsd4VgKFs9VlSdpNRQiMwnwHjRkBcM', 'ROLE_BREWER'),
('balin', '$2a$10$jhZcHK5Af3FGJff6sk7K2B13FasDHKZhwrDg1ddYvHTRiBXhWsqJ/', 'ROLE_BREWER'),
('thranduil', '$2a$10$8hQsTgL3VfcfRLcFHF8Gqejf2F1KbTg1PoflsdlWSlIGaWWwrLlGc', 'ROLE_USER');

INSERT INTO Brewer (brewer_id, breweries_owned, user_id) VALUES
(1, 1, 4),   -- Frodo (Brewer)
(2, 2, 5),   -- Samwise (Brewer)
(3, 1, 11),  -- Dumbledore (Brewer)
(4, 3, 12),  -- Barleycorn (Brewer)
(5, 1, 3),   -- Gandalf (Admin with Brewer role)
(6, 2, 13),  -- Aragorn (Brewer)
(7, 1, 15),  -- Elrond (Brewer)
(8, 2, 14),  -- Glorfindel (Brewer)
(9, 1, 15),  -- Balin (Brewer)
(10, 1, 5),  -- Samwise (Additional brewery)
(11, 1, 7);  -- Elrond (Additional brewery)

INSERT INTO Customer (customer_id, favorite_breweries, total_reviews, user_id) VALUES
(1, '["b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda"]', 6, 1),  -- User (Customer)
(2, '["3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8"]', 3, 2),  -- Admin (Customer)
(3, '["b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda"]', 6, 6),     -- Gollum (Customer)
(4, '["b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda"]', 2, 7),  -- Thorin (Customer)
(5, '["3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8"]', 2, 8),   -- Legolas (Customer)
(6, '["b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda", "3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8"]', 3, 14),  -- Boromir
(7, '["b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda"]', 2, 16),  -- Faramir
(8, '["3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8"]', 2, 17),   -- Eowyn
(9, '["b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda"]', 3, 17),  -- Merry
(10, '["3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8"]', 2, 18),  -- Pippin
(11, '["e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd"]', 2, 19),  -- Denethor
(12, '["c784521d-2f3c-4ae3-9b8a-7f9d1c21364a"]', 2, 20); -- Thranduil

INSERT INTO Brewery (brewery_id, brewery_name, brewery_type, address, city, state_province, postal_code, country, longitude, latitude, phone, website_url, brewer_id)
VALUES
('b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 'Twilight Brewing Company', 'brewpub', '2002 Shadow Lane', 'Seattle', 'Washington', '98101', 'United States', -122.330052, 47.606209, '206-555-0182', 'http://www.twilightbrewing.com', 2),
('3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 'Sunrise Craft Brewery', 'micro', '45 Sunrise Ave', 'Phoenix', 'Arizona', '85001', 'United States', -112.074036, 33.448376, '602-555-1234', 'http://www.sunrisecraftbrewery.com', 3),
('e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 'Rivendell Brewing', 'micro', '42 Elven Path', 'Rivendell', 'Middle-Earth', '94001', 'United States', -120.987654, 45.123456, '555-987-6543', 'http://www.rivendellbrewing.com', 7),
('c784521d-2f3c-4ae3-9b8a-7f9d1c21364a', 'Gondor Ales', 'brewpub', '50 Steward Road', 'Minas Tirith', 'Middle-Earth', '94002', 'United States', -121.123456, 45.987654, '555-765-4321', 'http://www.gondorales.com', 6),
('d9b8df8b-4824-8b3c-c12e3a1a1fda', 'Fangorn Brewing', 'micro', '1 Fangorn Rd', 'Fangorn Forest', 'Middle-Earth', '94003', 'United States', -122.125654, 45.765432, '555-998-8765', 'http://www.fangornbrewing.com', 1),  -- Glorfindel
('a9b8df8b-4812-9a3c-c13b2a1a1fdb', 'Lonely Mountain Ale', 'brewpub', '2 Lonely Mountain', 'Erebor', 'Middle-Earth', '94004', 'United States', -122.328765, 46.342123, '555-555-6789', 'http://www.lonelymountainale.com', 2), -- Balin
('z9b9df8b-4924-8c3b-d12e3a1a1fdc', 'Shire Brewing Co.', 'brewpub', '22 Bagshot Row', 'Shire', 'Middle-Earth', '94005', 'United States', -120.546132, 44.987654, '555-123-4567', 'http://www.shirebrewing.com', 6); -- Samwise


INSERT INTO CustomerFavorites (favorite_id, customer_id, brewery_id)
VALUES
(1, 1, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda'),
(2, 2, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda'),
(3, 3, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8'),
(4, 4, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8'),
(5, 6, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd'),  -- Boromir's favorite brewery
(6, 7, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda'),  -- Faramir's favorite brewery
(7, 8, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8'),  -- Eowyn's favorite brewery
(8, 9, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda'),  -- Merry
(9, 10, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8'),  -- Pippin
(10, 11, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd'), -- Denethor
(11, 12, 'c784521d-2f3c-4ae3-9b8a-7f9d1c21364a'); -- Thranduil


INSERT INTO CustomerReviews (review_id, customer_id, brewery_id, rating, customer_review, review_date)
VALUES
(1, 1, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 4, 'Great atmosphere and amazing stouts!', '2024-09-30'),
(2, 1, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 5, 'Loved the selection of seasonal beers!', '2024-09-29'),
(3, 1, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 4, 'A hidden gem with fantastic flavors!', '2024-09-28'),
(4, 1, 'c784521d-2f3c-4ae3-9b8a-7f9d1c21364a', 5, 'Cozy setting and friendly staff!', '2024-09-27'),
(5, 1, 'd9b8df8b-4824-8b3c-c12e3a1a1fda', 3, 'Decent beers but a bit overpriced.', '2024-09-26'),

(6, 2, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 5, 'Best IPAs in town! Highly recommend.', '2024-09-28'),
(7, 2, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 4, 'Stout as strong as a shieldmaiden.', '2024-09-30'),
(8, 2, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 5, 'A delightful experience every time!', '2024-09-29'),
(9, 2, 'c784521d-2f3c-4ae3-9b8a-7f9d1c21364a', 4, 'Great for a night out with friends!', '2024-09-27'),
(10, 2, 'd9b8df8b-4824-8b3c-c12e3a1a1fda', 3, 'Good selection but could improve service.', '2024-09-26'),

(11, 3, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 5, 'Fantastic selection of seasonal beers!', '2024-09-29'),
(12, 3, 'c784521d-2f3c-4ae3-9b8a-7f9d1c21364a', 4, 'I loved the food pairing options!', '2024-09-28'),
(13, 3, 'd9b8df8b-4824-8b3c-c12e3a1a1fda', 3, 'Nice spot but can get crowded.', '2024-09-27'),
(14, 3, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 4, 'Great outdoor seating area!', '2024-09-26'),
(15, 3, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 5, 'Unique flavors and friendly staff!', '2024-09-25'),

(16, 4, 'c784521d-2f3c-4ae3-9b8a-7f9d1c21364a', 4, 'Loved the ambiance and live music!', '2024-09-27'),
(17, 4, 'd9b8df8b-4824-8b3c-c12e3a1a1fda', 5, 'Had a wonderful time with friends.', '2024-09-29'),
(18, 4, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 4, 'Perfect for a cozy night out.', '2024-09-28'),
(19, 4, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 5, 'One of my favorites in the city!', '2024-09-26'),

(20, 5, 'd9b8df8b-4824-8b3c-c12e3a1a1fda', 4, 'Great for a quick pint before second breakfast.', '2024-09-28'),
(21, 5, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 5, 'One of the best breweries in the area!', '2024-09-30'),
(22, 5, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 3, 'Decent beers, but not the best.', '2024-09-27'),
(23, 5, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 4, 'Lovely place to spend an afternoon!', '2024-09-26'),

(24, 6, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 5, 'Elvish magic in every pint!', '2024-09-28'),
(25, 6, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 4, 'Great for relaxing after a long journey.', '2024-09-29'),
(26, 6, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 5, 'Strong and true, just like Gondor!', '2024-09-30'),
(27, 6, 'c784521d-2f3c-4ae3-9b8a-7f9d1c21364a', 4, 'Comfortable place to enjoy a drink.', '2024-09-27'),

(28, 7, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 4, 'Great for relaxing after a long journey.', '2024-09-29'),
(29, 7, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 5, 'Stout as strong as a shieldmaiden.', '2024-09-30'),
(30, 7, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 4, 'Good beers, but could use more options.', '2024-09-28'),

(31, 8, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 5, 'A cozy place with a fantastic view.', '2024-09-30'),
(32, 8, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 4, 'Perfect for a night out with friends!', '2024-09-29'),
(33, 8, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 3, 'Nice atmosphere, but the food was lacking.', '2024-09-28'),

(34, 9, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 3, 'Good beers, but the service was slow.', '2024-09-28'),
(35, 9, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 4, 'Great selection, but a bit pricey.', '2024-09-30'),
(36, 9, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 5, 'One of the best breweries in the area!', '2024-09-29'),

(37, 10, 'b0e7df8b-c2b3-4824-8b3c-c12e3a1a1fda', 5, 'Amazing craft beers with a twist!', '2024-09-30'),
(38, 10, '3f76421d-4d5b-4ae3-b3f0-bd6f3cf42ab8', 4, 'Loved the food pairing options!', '2024-09-29'),
(39, 10, 'e3f8521d-8b5b-48a4-83c7-e6b5b7490fdd', 3, 'Nice spot, but could be better.', '2024-09-28');

