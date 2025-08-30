/* import { profile } from "console"
import { create } from "domain"
import { pick } from "lodash"
import { from, range } from "rxjs"
import { archetypes } from "./archetype"
import random

# Define the archetypes and their trait modifiers
ARCHETYPES = {
    "Hero": {"Trustworthiness": 4, "Selflessness": 5, "Order": 3, "Fairness": 5, "Hopefulness": 4},
    "Outlaw": {"Trustworthiness": -2, "Selflessness": -1, "Order": -3, "Fairness": -3, "Hopefulness": -2},
    "Sage": {"Trustworthiness": 3, "Selflessness": 4, "Order": 4, "Fairness": 4, "Hopefulness": 5},
    "Explorer": {"Trustworthiness": 2, "Selflessness": 3, "Order": 1, "Fairness": 2, "Hopefulness": 3},
    "Ruler": {"Trustworthiness": 5, "Selflessness": 3, "Order": 5, "Fairness": 4, "Hopefulness": 2},
    "Caregiver": {"Trustworthiness": 4, "Selflessness": 5, "Order": 4, "Fairness": 5, "Hopefulness": 4},
    "Magician": {"Trustworthiness": 2, "Selflessness": 2, "Order": 3, "Fairness": 3, "Hopefulness": 5},
    "Creator": {"Trustworthiness": 3, "Selflessness": 3, "Order": 2, "Fairness": 3, "Hopefulness": 4},
    "Lover": {"Trustworthiness": 4, "Selflessness": 5, "Order": 2, "Fairness": 4, "Hopefulness": 5},
    "Jester": {"Trustworthiness": 1, "Selflessness": 2, "Order": -1, "Fairness": 3, "Hopefulness": 3},
    "Innocent": {"Trustworthiness": 5, "Selflessness": 5, "Order": 4, "Fairness": 5, "Hopefulness": 5},
    "Regular Person": {"Trustworthiness": 3, "Selflessness": 3, "Order": 3, "Fairness": 3, "Hopefulness": 3}
}

# Define Big 5 Personality traits
BIG_5_TRAITS = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism']

# Helper function to create a random Big 5 personality profile
def generate_big_5():
    return {
        "Openness": random.randint(-5, 5),
        "Conscientiousness": random.randint(-5, 5),
        "Extraversion": random.randint(-5, 5),
        "Agreeableness": random.randint(-5, 5),
        "Neuroticism": random.randint(-5, 5)
    }

# Helper function to pick a random archetype
def get_random_archetype():
    return random.choice(list(ARCHETYPES.keys()))

# Function to create a character
def create_character():
    archetype = get_random_archetype()
    big_5 = generate_big_5()
    
    # Get base traits from the selected archetype
    archetype_traits = ARCHETYPES[archetype]
    
    # Combine Big 5 traits with archetype-based traits
    character = {
        "Archetype": archetype,
        "Big 5": big_5,
        "Traits": archetype_traits
    }
    
    return character

# Generate 10 characters
characters = [create_character() for _ in range(10)]

# Print the character details
for i, character in enumerate(characters, 1):
    print(f"Character {i}:")
    print(f"Archetype: {character['Archetype']}")
    print(f"Big 5 Personality: {character['Big 5']}")
    print(f"Traits: {character['Traits']}")
    print("\n" + "-"*40 + "\n")
 */
