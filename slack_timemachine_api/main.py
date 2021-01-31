import os, sys
from os.path import dirname


root_dir = dirname(dirname(os.path.join(os.getcwd(), dirname(__file__))))

sys.path.append(os.path.join(root_dir, "slack_archaeologist"))

from model.message import Message

print(Message.get_user_ids())