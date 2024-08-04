import json
import openai
# Set your API key
openai.api_key = 'your-api-key-here'

# Function to generate a horoscope based on blockchain activity
def generate_horoscope(blockchain_activity):
    # Convert blockchain activity to a readable format for the AI
    activity_summary = json.dumps(blockchain_activity, indent=2)

    # Create the prompt
    prompt = f"""
    Based on the following blockchain activity, generate a personalized horoscope prediction:
    
    {activity_summary}
    
    Horoscope:
    """

    # Make the API call
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.7,
        n=1,
        stop=None
    )

    # Extract and return the generated horoscope
    horoscope = response.choices[0].text.strip()
    return horoscope

# Example blockchain activity data for a user
blockchain_activity = {
    "user_id": "123456",
    "transactions": [
        {"type": "transfer", "amount": 2.5, "timestamp": "2024-01-01T12:00:00Z"},
        {"type": "swap", "amount": 1.0, "timestamp": "2024-01-02T15:00:00Z"},
        # More transactions...
    ],
    "interactions": [
        {"contract": "DeFiProtocol", "action": "stake", "amount": 5.0, "timestamp": "2024-01-03T10:00:00Z"},
        # More interactions...
    ]
}

# Generate the horoscope
horoscope = generate_horoscope(blockchain_activity)
print(horoscope)
