"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            'answer': 6, 'explanation': [1, 0, 1, 1], 'input': [5, -3, -1, 2]},
        {
            'answer': 8, 'explanation': [1, 1, 0, 1, 1], 'input': [5, 6, -10, -7, 4]},
        {
            'answer': 393, 'explanation': [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            'input': [-11, 69, 77, -51, 23, 67, 35, 27, -25, 95]
        },
        {
            'answer': 125, 'explanation': [0, 1, 0, 1, 1, 1, 1, 1, 1],
            'input': [-21, -23, -69, -67, 1, 41, 97, 49, 27]
        },
        {
            'answer': 14, 'explanation': [0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
            'input': [-47, 13, -39, -97, -85, -23, -11, 89, 15, 17]
        },
        {
            'answer': 5, 'explanation': [1, 1, 1, 1, 1], 'input': [1, 1, 1, 1, 1]
        },
        {
            'answer': 20, 'explanation': [0, 1, 0, 1], 'input': [-10, 10, -10, 10]
        }
    ],
    "Extra": [
        {
            'input': [13, 24, -23, -12, -12, 12, 13], 'explanation': [1, 1, 0, 1, 0, 1, 1],
            'answer': 50
        },
        {
            'input': [-10, -10, -10, 99, -10, -10], 'explanation': [0, 1, 0, 1, 0, 1],
            'answer': 79
        },
        {
            'input': [5, 4, 3, -99, 2, -20], 'explanation': [1, 1, 1, 0, 1, 0], 'answer': 14
        },
        {
            'input': [-10, -1, -1, -10], 'explanation': [0, 1, 1, 0], 'answer': -2
        },

    ]
}
