import wolframalpha as wa
import json
import xmltodict

def wolframAsk(question):
    client = wa.Client("9H7RKK-H7KYTPWXHQ")
    res = client.query(question)
    results = {}
    i = 1
    for pod in res.results:
        for sub in pod.subpods:
            val = sub.plaintext
            key = "res" + str(i)
            results[key] = val
            i += 1
    return results


if __name__ == '__main__':
    wolframAsk('lim h->0 (8(1/2+h)^8 - 8(1/2)^8)/h')