import sys
from colorama import init, Fore, Style

# 初始化colorama
init(autoreset=True)

class Log:
    @staticmethod
    def warn(message):
        # 输出红色的警告信息
        sys.stdout.write(Fore.RED + Style.BRIGHT + "WARNING: " + message + "\n")

    @classmethod
    def info(cls, message):
        sys.stdout.write("INFO: " + message + "\n")

