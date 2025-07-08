document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
        `;

        // Add extra activities (for demonstration, not actual signup)
        // Sports
        if (name === "Basketball") {
          const soccerCard = document.createElement("div");
          soccerCard.className = "activity-card";
          soccerCard.innerHTML = `
            <h4>Soccer</h4>
            <p>Join our soccer team for weekly matches and training sessions.</p>
            <p><strong>Schedule:</strong> Saturdays 10am-12pm</p>
            <p><strong>Availability:</strong> 10 spots left</p>
          `;
          activitiesList.appendChild(soccerCard);

          const tennisCard = document.createElement("div");
          tennisCard.className = "activity-card";
          tennisCard.innerHTML = `
            <h4>Tennis</h4>
            <p>Improve your tennis skills with our group lessons and friendly games.</p>
            <p><strong>Schedule:</strong> Thursdays 4pm-6pm</p>
            <p><strong>Availability:</strong> 8 spots left</p>
          `;
          activitiesList.appendChild(tennisCard);
        }

        // Artistic
        if (name === "Painting") {
          const danceCard = document.createElement("div");
          danceCard.className = "activity-card";
          danceCard.innerHTML = `
            <h4>Dance</h4>
            <p>Express yourself through various dance styles in our fun classes.</p>
            <p><strong>Schedule:</strong> Fridays 5pm-7pm</p>
            <p><strong>Availability:</strong> 12 spots left</p>
          `;
          activitiesList.appendChild(danceCard);

          const photographyCard = document.createElement("div");
          photographyCard.className = "activity-card";
          photographyCard.innerHTML = `
            <h4>Photography</h4>
            <p>Learn photography basics and participate in photo walks.</p>
            <p><strong>Schedule:</strong> Sundays 2pm-4pm</p>
            <p><strong>Availability:</strong> 9 spots left</p>
          `;
          activitiesList.appendChild(photographyCard);
        }

        // Intellectual
        if (name === "Chess Club") {
          const debateCard = document.createElement("div");
          debateCard.className = "activity-card";
          debateCard.innerHTML = `
            <h4>Debate Club</h4>
            <p>Sharpen your public speaking and critical thinking skills.</p>
            <p><strong>Schedule:</strong> Wednesdays 3pm-5pm</p>
            <p><strong>Availability:</strong> 15 spots left</p>
          `;
          activitiesList.appendChild(debateCard);

          const codingCard = document.createElement("div");
          codingCard.className = "activity-card";
          codingCard.innerHTML = `
            <h4>Coding Club</h4>
            <p>Collaborate on coding projects and learn new programming languages.</p>
            <p><strong>Schedule:</strong> Mondays 4pm-6pm</p>
            <p><strong>Availability:</strong> 11 spots left</p>
          `;
          activitiesList.appendChild(codingCard);
        }

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      // Validate student is not already signed up for the selected activity
      const activityDetails = Array.from(activitySelect.options).find(
        (opt) => opt.value === activity
      );
      // Optionally, you could fetch the latest activities list again here for up-to-date info

      // Proceed with signup
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
