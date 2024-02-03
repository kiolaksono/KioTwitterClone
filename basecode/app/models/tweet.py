from app.extensions import db

class Tweets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(128))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    image_name = db.Column(db.String(128))
    image_path = db.Column(db.String(1000)) 
    
    user = db.relationship('Users', back_populates='tweet')


    def serialize(self): 
        return {
            "id": self.id,
            "content": self.content,
            "user_id" : self.user_id,
            "image_name": self.image_name,
            "image_path" : self.image_path

        }    
