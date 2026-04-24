def _normalize(value, min_value, max_value):
    if max_value <= min_value:
        return 0.0
    clamped = max(min_value, min(max_value, value))
    return (clamped - min_value) / (max_value - min_value)


def score_risk_profile(age, salary, risk_tolerance):
    """
    Scores risk from 1-10 using age, salary, and selected risk tolerance.
    Higher score = more aggressive profile.
    """
    age = int(age or 30)
    salary = int(salary or 50000)
    risk_tolerance = (risk_tolerance or "moderate").lower()

    # Younger users generally have more time to recover from drawdowns.
    age_score = 1.0 - _normalize(age, 18, 70)
    # Higher income can support higher volatility allocations.
    salary_score = _normalize(salary, 25000, 250000)
    tolerance_score = {
        "conservative": 0.20,
        "moderate": 0.50,
        "aggressive": 0.75,
        "speculative": 0.95,
    }.get(risk_tolerance, 0.50)

    weighted = (0.45 * age_score) + (0.25 * salary_score) + (0.30 * tolerance_score)
    risk_score = max(1, min(10, round(weighted * 10)))

    if risk_score <= 3:
        risk_band = "low"
    elif risk_score <= 6:
        risk_band = "moderate"
    elif risk_score <= 8:
        risk_band = "high"
    else:
        risk_band = "very-high"

    # Convert to a small multiplier adjustment for allocation engine.
    # Centered at zero so moderate profiles remain stable.
    multiplier_bias = round((risk_score - 5) * 0.04, 3)

    return {
        "risk_score": risk_score,
        "risk_band": risk_band,
        "inputs": {
            "age": age,
            "salary": salary,
            "risk_tolerance": risk_tolerance,
        },
        "multiplier_bias": multiplier_bias,
    }
