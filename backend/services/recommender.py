def recommend(data):
    risk = data.get("risk")

    if risk == "low":
        return ["Fixed Deposit", "Gold"]

    elif risk == "medium":
        return ["Mutual Funds", "Index Funds"]

    elif risk == "high":
        return ["Stocks", "Crypto"]

    return ["Diversified Portfolio"]