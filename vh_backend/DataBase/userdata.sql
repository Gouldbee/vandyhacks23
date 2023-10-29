DROP TABLE IF EXISTS userdata;
CREATE TABLE userdata (
  id INTEGER PRIMARY KEY,
  Named TEXT,
  Gender TEXT,
  Allergies TEXT NOT NULL DEFAULT '',
  CurrentMedication TEXT NOT NULL DEFAULT '',
  MedicalCondition TEXT NOT NULL DEFAULT ''
);


INSERT INTO userdata (id, Named, Gender, Allergies, CurrentMedication, MedicalCondition) VALUES (1,'Vince','male','grass','zantac','cs major');
INSERT INTO userdata (id, Named, Gender, Allergies, CurrentMedication, MedicalCondition) VALUES (2,'Jackson','male','grass','zantac','cs major');
INSERT INTO userdata (id, Named, Gender, Allergies, CurrentMedication, MedicalCondition) VALUES (3,'Richard','male','women','none','ECE major');
