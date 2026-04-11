print("🚀 Starting Model Training...")

import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# =========================
# Load dataset
# =========================
df = pd.read_csv("iot_ml_dataset_1000.csv")
print("✅ Dataset Loaded")

# =========================
# Features
# =========================
features = [
    "traffic_spike",
    "unknown_ip",
    "high_packet_rate",
    "protocol_misuse",
    "frequent_requests"
]

# =========================
# Create NORMAL DATA (IMPORTANT FIX)
# =========================
df_normal = df.copy()

df_normal["traffic_spike"] = 0
df_normal["unknown_ip"] = 0
df_normal["high_packet_rate"] = 0
df_normal["protocol_misuse"] = 0
df_normal["frequent_requests"] = 0
df_normal["label"] = 0

# Combine attack + normal
df = pd.concat([df, df_normal])

# Shuffle dataset
df = df.sample(frac=1).reset_index(drop=True)

print("✅ Normal + Attack data prepared")

# =========================
# Split data
# =========================
X = df[features]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("✅ Data Split Done")

# =========================
# Train Model
# =========================
model = IsolationForest(
    contamination=0.3,  # increased for better detection
    random_state=42
)

model.fit(X_train)

print("✅ Model Trained")

# =========================
# Predict
# =========================
y_pred = model.predict(X_test)

# Convert: -1 → attack(1), 1 → normal(0)
y_pred = [1 if x == -1 else 0 for x in y_pred]

# =========================
# Evaluation
# =========================
print("\n📊 Model Evaluation:\n")
print(classification_report(y_test, y_pred, zero_division=0))

# =========================
# Save Model
# =========================
joblib.dump(model, "model.pkl")
print("💾 Model saved as model.pkl")