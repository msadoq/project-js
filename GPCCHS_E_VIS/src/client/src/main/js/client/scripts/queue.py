class PileSingleton(object):
    instance = None         
    data_pile = []          

    def __init__(self):
        pass           

    def __new__(cls):
        if cls.instance is None:
            cls.instance = object.__new__(cls)
        return cls.instance                   
                                                                                                                                                                                                     
    def process(self):                                                                                                                                                                               
        if len(self.data_pile) > 0:                                                                                                                                                              
            data = self.data_pile.pop()
            return data                                                                                                                                                        

    def add_message(self, data):
        self.data_pile.append(data)

    def size(self):
        return len(self.data_pile)