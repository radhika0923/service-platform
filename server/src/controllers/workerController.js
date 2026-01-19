export const workerProfile = async (req, res) => {
  res.json({ message: "Worker profile data" });
};

export const myTasks = async (req, res) => {
  res.json({ message: "Worker tasks list" });
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  res.json({
    message: `Task ${taskId} status updated`
  });
};
