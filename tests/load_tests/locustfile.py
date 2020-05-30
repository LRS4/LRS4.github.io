import random
from locust import HttpUser, TaskSet, task, between

class MyTasks(TaskSet):
    wait_time = between(5, 9)

    @task(3)
    def index_page(self):
        self.client.get("")

    @task(1)
    def quotes_page(self):
        self.client.get("projects/quotes-machine.html")

    @task(1)
    def calc_page(self):
        self.client.get("projects/fi-calculator.html")

    @task(1)
    def news_app_page(self):
        self.client.get("projects/rewind-app.html")

class MyWebsiteUser(HttpUser):
    tasks = [MyTasks]