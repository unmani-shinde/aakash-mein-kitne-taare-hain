import json
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load the model and tokenizer from Hugging Face
model_name = "gpt2-xl"  # You can use 'gpt2-medium', 'gpt2-large', or 'gpt2-xl' for better performance
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

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
    
    # Encode the prompt
    input_ids = tokenizer.encode(prompt, return_tensors='pt')

    # Generate the horoscope
    output = model.generate(
        input_ids,
        max_length=len(input_ids[0]) + 100,  # Add more tokens for the generated content
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.95,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id  # Ensure padding token is handled
        
    )

    # Decode the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    
    # Trim the output to remove the prompt part if needed
    generated_text = generated_text[len(prompt):].strip()
    
    return generated_text

# Example blockchain activity data for a user
blockchain_activity = {
    "user_id": "123456",
    "transactions": [
        {"type": "transfer", "amount": 2.5, "timestamp": "2024-01-01T12:00:00Z"},
        {"type": "swap", "amount": 1.0, "timestamp": "2024-01-02T15:00:00Z"},
    ],
    "interactions": [
        {"contract": "DeFiProtocol", "action": "stake", "amount": 5.0, "timestamp": "2024-01-03T10:00:00Z"},
    ]
}

# Generate the horoscope
horoscope = generate_horoscope(blockchain_activity)
print(horoscope)
