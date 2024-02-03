from app.extensions import db

class CountTweet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    total_tweet = db.Column(db.Integer, default=0)
    
    # fungsi serialize
    def serialize(self):
        return{
            "id":self.id,
            "username": self.username,
            "total_tweet":self.total_tweet
        }
        
        